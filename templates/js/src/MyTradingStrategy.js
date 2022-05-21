import { MidaExpertAdvisor, MidaTimeframe, } from "@reiryoku/mida";

export class MyTradingStrategy extends MidaExpertAdvisor {
    constructor ({ tradingAccount, }) {
        super({
            name: "MyTradingStrategy",
            version: "1.0.0",
            tradingAccount,
        });
    }

    async configure () {
        await this.watchTicks("BTCUSDT");
        await this.watchPeriods("ETHUSDT", MidaTimeframe.M1);
    }

    async onStart () {
        console.log("Started...");
    }

    async onTick (tick) {
        const btcUsdtPrice = tick.bid;

        console.log(`Bitcoin price update: ${btcUsdtPrice} USDT`);
    }

    async onPeriodClose (period) {
        const ethUsdtClosePrice = period.close;

        console.log("ETHUSDT candlestick closed on M1 chart");
        console.log(`Close price is ${ethUsdtClosePrice} USDT`);
    }

    async onStop () {
        console.log("Stopped...");
    }
}
