import {Injectable} from "@angular/core";
import {Observable, Subject, BehaviorSubject} from "rxjs";
import {Tick} from "../models/tick";

@Injectable()
export class BitfinexService {

    private endpoint: string = 'wss://api.bitfinex.com/ws/';

    private websocket: WebSocket;
    private channel: number;

    private _connectionStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _ticker: Subject<Tick> = new Subject<Tick>();

    private socketOpen = (pair: string) => {
        return (event: Event) => {
            console.log("WS connection open");
            this.websocket.send(JSON.stringify({
                event: "subscribe",
                channel: "ticker",
                pair: pair
            }));
            this._connectionStatus.next(true);
        };
    };

    private socketClosed = (event: Event) => {
        console.log("WS connection closed");
        this._connectionStatus.next(false);
    };

    private messageReceived = (event: MessageEvent) => {
        const msg = JSON.parse(event.data);

        if (msg.event === 'subscribed') {
            this.channel = msg.chanId;
            console.log("Subscribed to ticker channel " + this.channel);
        } else if (this.channel && msg[0] === this.channel && msg[1] !== 'hb') {
            console.log("Message received " + event.data);
            // ignore hearbeats and get only the ticks
            this._ticker.next({
                bid: msg[1],
                bidSize: msg[2],
                ask: msg[3],
                askSize: msg[4],
                lastPrice: msg[7],
                volume: msg[8],
            });
        }
    };

    public get connectionStatus(): Observable<boolean> {
        return this._connectionStatus;
    }

    public get ticker(): Observable<Tick> {
        return this._ticker;
    }

    public connect(pair: string): Observable<boolean> {
        if (this.websocket != null) {
            console.log("Already connected");
        } else {
            this.doConnect(pair);
        }
        return this._connectionStatus;
    }

    public disconnect(): Observable<boolean> {
        if (this.websocket != null) {
            this.websocket.close()
            this.websocket = null;
        } else {
            console.log("Connection already closed");
        }
        return this._connectionStatus;
    }

    private doConnect(pair: string) {
        console.log("Connecting to WS");
        this.websocket = new WebSocket(this.endpoint);

        this.websocket.onmessage = this.messageReceived;
        this.websocket.onopen = this.socketOpen(pair);
        this.websocket.onclose = this.socketClosed;
    }

}
