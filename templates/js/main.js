import { Mida, login, } from "@reiryoku/mida";
import { ProInspector } from "@reiryoku/pro-inspector";
import { BinancePlugin, } from "@reiryoku/mida-binance";
import { CTraderPlugin, } from "@reiryoku/mida-ctrader";
import { MyTradingStrategy, } from "./src/MyTradingStrategy.js";

// Used to enhance console logs
ProInspector.activateGlobally();
// Used to install the Binance plugin
Mida.use(new BinancePlugin());
// Used to install the cTrader plugin
Mida.use(new CTraderPlugin());

(async () => {
    // Read the documentation at www.mida.org to use other trading platforms
    // Binance Spot account login
    const myAccount = await login("Binance/Spot", {
        apiKey: "***",
        apiSecret: "***",
    });

    // Create instance of a trading bot
    const myTradingBot = new MyTradingStrategy({
        tradingAccount: myAccount,
    });

    // Start the trading bot
    await myTradingBot.start();

    // Stop the trading bot after 10 minutes
    setTimeout(() => myTradingBot.stop(), 1000 * 60 * 10);
})();
