import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {StoreModule} from "@ngrx/store";
import {reducer} from "./reducers/index";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {TickEffects} from "./effects/tick";
import {ConnectionComponent} from "./component/connection.component";
import {ConnectionEffects} from "./effects/connection";
import {BitfinexService} from "./service/bitfinex.service";
import {ConnectButtonComponent} from "./component/connect-button.component";
import {TickerComponent} from "./component/ticker.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        StoreModule.provideStore(reducer),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
        EffectsModule.run(TickEffects),
        EffectsModule.run(ConnectionEffects)
    ],
    declarations: [
        AppComponent,
        ConnectionComponent,
        ConnectButtonComponent,
        TickerComponent
    ],
    providers: [BitfinexService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
