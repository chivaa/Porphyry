import React, { Component } from 'react';
import by from 'sort-by';
import Hypertopic from 'hypertopic';
import conf from './config.json';
import Viewpoint from './Viewpoint';
import Corpora from './Corpora';
import Header from './Header.js';

import './App.css';

class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      viewpoint: [],
      corpus: []
    }
  }

  render() {
    const corpora = this._getCorpora();
    return (
      <div className="App">
        <Header link="./user_icone.png"/>
        <div ></div>
          <div className="App-content">
            {corpora}
          </div>
        </div>
    );
  }

  componentDidMount() {
    this._fetchBookmarks();
  }

  _fetchBookmarks() {
    const hypertopic = new Hypertopic(conf.services);
    hypertopic.getView(`/user/${conf.user}`, (data) => {
      this.setState(data[conf.user]);
    });
  }

  _getViewpoints() {
    return this.state.viewpoint.sort(by('name')).map(v =>
      <Viewpoint key={v.id} id={v.id} name={v.name} />
    );
  }

  _getCorpora() {
    let ids = this.state.corpus.map(c => c.id);
    return (
      <Corpora ids={ids} />
    );
  }
}

export default Portfolio;
