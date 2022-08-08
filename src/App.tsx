import React, {useEffect, useState} from 'react';
import './App.css';

const App = () => {
    const [UserMoney, setUserMoney] = useState<number>(100);
    const [howEarnInClick, setHowEarnInClick] = useState<number>(0);
    const [howCostUpgradeClick, setHowCostUpgradeClick] = useState<number>(10);
    const [howCostUpgradeAutoClick, setHowCostUpgradeAutoClick] = useState<number>(100);
    const [howEarnAutoClick, setHowEarnAutoClick] = useState<number>(0);

    const count10Upgrade = () => {
        let costUp10 = 0, costNow = howCostUpgradeClick;
        for (let i = 0; i < 10; i++) {
            costUp10 += costNow;
            costNow *= 2;
        }
        return costUp10;
    }

    const [howCost10UpgradeClick, setHowCost10UpgradeClick] = useState<number>(count10Upgrade);
    const howToIncreaseUpgradeClickCost = 1.5;

    useEffect(() => {
        const interval = setInterval(() => {
            //setUserMoney(x => x + howEarnAutoClick);
            const button = document.getElementById('add_coins');
            if (button !== null) {
                button.click();
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [howEarnAutoClick])

    const AddCoins = () => {
        setUserMoney(UserMoney + howEarnInClick)
    }

    const UpgradeClick = () => {
        if (UserMoney >= howCostUpgradeClick) {
            setUserMoney(UserMoney - howCostUpgradeClick)
            setHowEarnInClick(howEarnInClick + 1);
            setHowCostUpgradeClick(howCostUpgradeClick * howToIncreaseUpgradeClickCost);
            setHowCost10UpgradeClick(count10Upgrade);
        } else {
            alert('Not enough money');
        }
    }

    const Upgrade10Click = () => {
        if (UserMoney >= howCost10UpgradeClick) {
            setUserMoney(UserMoney - howCost10UpgradeClick)
            setHowEarnInClick(howEarnInClick + 10);
            setHowCostUpgradeClick(howCostUpgradeClick * Math.pow(2, 10));
        } else {
            alert('Not enough money');
        }
    }
    const UpgradeAutoClick = () => {
        if (UserMoney >= howCostUpgradeAutoClick) {
            setUserMoney(UserMoney - howCostUpgradeAutoClick)
            setHowEarnAutoClick(howEarnAutoClick + 1);
            setHowCostUpgradeAutoClick(howCostUpgradeAutoClick * 2);
        } else {
            alert('Not enough money');
        }
    }

    return (
        <div className="App">
            <div className={'score'}>
                UserMoney: {UserMoney}
            </div>
            <div className={'buttons'}>
                <div>
                    <button onClick={AddCoins} id={'add_coins'}>Add {howEarnInClick} coin</button>
                </div>
                <div>
                    Cost: {howCostUpgradeClick}
                    <button onClick={UpgradeClick} disabled={UserMoney < howCostUpgradeClick}>Upgrade click</button>
                </div>
                <div>
                    Cost: {howCost10UpgradeClick}
                    <button onClick={Upgrade10Click} disabled={UserMoney < howCost10UpgradeClick}>Upgrade 10
                        click
                    </button>
                </div>
                <div>
                    Cost: {howCostUpgradeAutoClick}
                    <button onClick={UpgradeAutoClick} disabled={UserMoney < howCostUpgradeAutoClick}>Buy auto click
                    </button>
                    Level: {howCostUpgradeAutoClick / 100}
                </div>
                <button>Activate autoclick button</button>
            </div>
        </div>
    );
}

export default App;
