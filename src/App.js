/**
 *  @author Santiago Montero
 */

import React, { Component } from 'react';
import './App.css';

const jsonUrl = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

class App extends Component {

  constructor(props){
    super(props);
    this.getAlbums = this.getAlbums.bind(this);
    this.setCategory = this.setCategory.bind(this);
    
    this.state={
      albums : [],
      categories: [],
      category: null
    };
  }

  // LIFECYCLE METHODS
  componentDidMount() {
    // noinspection JSIgnoredPromiseFromCall
    this.getAlbums();
  }

  // APP LOGIC METHODS

  async getAlbums() {
    const response = await fetch(jsonUrl);
    const { feed } = await response.json();
    if(feed.entry) {
      this.setState({ albums: feed.entry }, () => this.getCategories());
    }
  }

  getCategories() {
    const { albums } = this.state;
    let auxArray = [];
    for (let i = 0; i < albums.length; i++) {
      const label = albums[i].category.attributes.label;
      if(auxArray.indexOf(label) === -1) {
        auxArray.push(label)
      }
    }
    this.setState({
      categories: auxArray
    });
  }

  setCategory (category) {
    this.setState({category})
  }

  /* eslint-disable array-callback-return */
  render() {
    const { albums, category } = this.state;
    return (
      <div className="row app">
        <div className="col-3 menu">
          <div className="row muzik-logo">
            <div className="col-12">
              <span>Muzik</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 center-vert">
              <div className="row">
                <div className="col-12">
                  {
                    this.state.categories && this.state.categories.length>0 &&
                    <div className="list-group">
                      {
                        this.state.categories.map((item, index)=>{
                          const classes = item === category ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action";
                          return(
                            <button key={index} onClick={() => this.setCategory(item)} type="button" className={classes}>
                              {item}
                            </button>
                          );
                        })
                      }
                      </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="row music-songs-container">
            <div className="col-12">
              Music Songs
            </div>
          </div>
          <div className="row">
            <div className="col-12 grid-container">
              {
                albums && albums.length &&
                  albums.map((item, index) => {
                    if(!category)
                    return (
                      <div key={index} className="row">
                        <div className="col-12">
                          <div className="row">
                            <div className="col-12">
                              <img src={item["im:image"][2].label} height={150} alt=""/>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <span>
                              { item["im:artist"].label }
                            </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                    else if(category===item.category.attributes.label) return(
                      <div key={index} className="row">
                        <div className="col-12">
                          <div className="row">
                            <div className="col-12">
                              <img src={item["im:image"][2].label} height={150} alt=""/>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <span>
                              { item["im:artist"].label }
                            </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
