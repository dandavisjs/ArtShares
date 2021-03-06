import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import ArtShares from '../abis/ArtShares.json'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData(){
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})

    const networkId = await web3.eth.net.getId()
    const networkData = ArtShares.networks[networkId]
    if(networkData){
      const abi = ArtShares.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi,address)
      this.setState({ contract})
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
    
  }

  constructor(props) {
    super(props);
    this.state = { 
      accounts: '',
      contract: null,
      shares: []
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dapp University
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                {/* FORM GOES HERE */}
              </div>
            </main>
          </div>
          <hr/>
          <div className="row text-center"><p>Tokens Go Here</p></div>
        </div>
      </div>
    );
  }
}

export default App;
