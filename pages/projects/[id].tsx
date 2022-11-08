import type { AppProps } from 'next/app';
import React, {useState} from 'react';


export default function App({ Component, pageProps }: AppProps) {
    const [modal, setModal] = useState(false);
    const [drop, setDrop] = useState(false);
    const [userChecked, setUserChecked] = useState('');

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
            <div className="history">
                <p>Projects Issues History</p>

                <i className='fa fa-plus' onClick={() => setModal(true)}></i>
            </div>

            <p className="today">
                Open Issues
            </p>

            <div className="transactions-card">
                <div className="start">
                    <i className="fa fa-arrow-down"></i>
                    <div className="details">
                        <p>Cash Application</p>
                        <p className="amount">3 members</p>
                    </div>
                </div>

                <div className="middle">
                    <i className="fa fa-user" onClick={()=> setDrop(!drop)}>

                        { drop &&
                            <div className="dropdown">
                                <p>Assign Member To issue</p>
                                <hr />
                                <ul>
                                    <li><p>Chris Jones</p> <input type="checkbox" checked={userChecked == 'Chris Jones'} name="" id="" onClick={()=> setUserChecked('Chris Jones')} /></li>
                                    <li><p>Philip Kelvin</p><input type="checkbox" checked={userChecked == 'Philip Kelvin'} name="" id="" onClick={()=> setUserChecked('Philip Kelvin')}/></li>
                                </ul>
                                
                                
                            </div>
                        }

                    </i>

                    <div className="status">
                        <div className='pending'>
                           <input type="checkbox" name="" id="" />  <p>Pending</p>
                        </div>

                        <div className='progress'>
                           <input type="checkbox" name="" id="" />  <p>Started</p>
                        </div>

                        <div className='completed'>
                             <input type="checkbox" name="" id="" /><p>Completed</p>
                        </div>
                    </div>


                </div>

                <div className="end">
                    <p className="date">Oct 25</p>
                    <p className="coin-amount">Open Issues: 4</p>
                    
                </div>

            </div>


            <p className="today">
                Issues in progress
            </p>

            <div className="transactions-card">
                <div className="start">
                    <i className="fa fa-arrow-right"></i>
                    <div className="details">
                        <p>Cash Application</p>
                        <p className="amount">3 members</p>
                    </div>
                </div>

                <div className="end">
                    <p className="date">Oct 25</p>
                    <p className="coin-amount">Open Issues: 4</p>
                    
                </div>

            </div>




            <p className="today">
                Completed Issues
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
                    <p className="coin-amount">Open Issues: 4</p>
                    
                </div>

            </div>

        </div>

        
        { modal && 
            <div className="modal-overlay" >
                <div className="verify-modal">
                    <div className="verify-modal-header">
                        <p>Create Issue For Frontend Development Project</p>
                        <i className="fa fa-close" onClick={() => setModal(false)}></i>
                    </div>

                    <label>Enter Issue Name</label><br/>
                    <input type="text" placeholder="" /><br/>

                    <label>Description</label><br/>
                    <input type="text" placeholder="" /><br/>

                    <div className="modal-footer">
                        <i className="fa fa-user" onClick={()=> setDrop(!drop)}>

                            { drop &&
                                <div className="dropdown">
                                    <p>Assign Member To issue</p>
                                    <hr />
                                    <ul>
                                        <li><p>Chris Jones</p> <input type="checkbox" checked={userChecked == 'Chris Jones'} name="" id="" onClick={()=> setUserChecked('Chris Jones')} /></li>
                                        <li><p>Philip Kelvin</p><input type="checkbox" checked={userChecked == 'Philip Kelvin'} name="" id="" onClick={()=> setUserChecked('Philip Kelvin')}/></li>
                                    </ul>
                                    
                                    
                                </div>
                            }

                        </i>
                        <button className="btn-primary">Create</button>
                    </div>

                </div>
            </div>
        }
    </div>
  )
}