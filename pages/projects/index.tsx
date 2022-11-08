import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {


  return (

    <div>
        <div className="stats">
        
            <div className="stats-cards">
                <p>Team</p>
                <h3>5</h3> 
            </div>

            <div className="stats-cards">
                <p>Open Issues</p>
                <h3>5</h3> 
            </div>

            <div className="stats-cards">
                <p>Completed Issues</p>
                <h3>5</h3> 
            </div>

        </div>

        <div className="transactions">
            <p className="history">
                Projects History
            </p>

            <p className="today">
                Open Projects
            </p>

            <div className="transactions-card">
                <div className="start">
                    <i className="fa fa-arrow-down"></i>
                    <div className="details">
                        <p>Cash Application</p>
                        <p className="amount">3 members</p>
                    </div>
                </div>

                <div className="end">
                    <p className="date">Oct 25</p>
                    <p className="coin-amount">Issues: 4</p>
                    
                </div>

            </div>

            <p className="today">
                Completed Projects
            </p>

            <div className="transactions-card">
                <div className="start">
                    <i className="fa fa-arrow-up"></i>
                    <div className="details">
                        <p>CoinSys Website</p>
                        <p className="amount">3 members</p>
                    </div>
                </div>

                <div className="end">
                    <p className="date">Oct 25</p>
                    <p className="coin-amount">Issues: 4</p>
                    
                </div>

            </div>

        </div>

    </div>
  )
}