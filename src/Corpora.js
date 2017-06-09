import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import by from 'sort-by';
import Hypertopic from 'hypertopic';
import conf from './config.json';

class Corpora extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  render() {
    let items = this._getItems();
    var page = 1;
    var i = (page-1)*10;
      return(
        <div className="Subject">
          {/* Bases sur lesquelles on récup les info et le nombre d'éléments récupérés
           <h3>{this.props.ids.join(' + ')} ({this.state.items.length})</h3> 
           */}
          <div className="Items">          
            {
              items[i]
            }
          </div><div className="Items">          
            {
              items[i+1]
            }
          </div>
          <div className="Items">          
            {
              items[i+2]
            }
          </div>
           <div className="Items">          
            {
              items[i+3]
            }
          </div><div className="Items">          
            {
              items[i+4]
            }
          </div>
          <div className="Items">          
            {
              items[i+5]
            }
          </div>
           <div className="Items">          
            {
              items[i+6]
            }
          </div><div className="Items">          
            {
              items[i+7]
            }
          </div>
          <div className="Items">          
            {
              items[i+8]
            }
          </div>
          <div className="Items">          
            {
              items[i+9]
            }
          </div>
        </div>
      );    
  }

  componentDidMount() {
    this._timer = setInterval(
      () => this._fetchItems(),
      15000
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) this._fetchItems();
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  _getItems() {
    return this.state.items.map(item => 
        <Item key={item.id} name={item.name[0]} thumbnail={item.thumbnail[0]} 
          id={item.corpus+'/'+item.id} />
    ); 
  }

  _fetchItems() {
    const hypertopic = new Hypertopic(conf.services);
    let uris = this.props.ids.map(id => '/corpus/' + id);
    hypertopic.getView(uris, (data) => {
      let items = [];
      for (let corpus in data) {
        for (let itemId in data[corpus]) {
          if (!['id','name','user'].includes(itemId)) {
            let item = data[corpus][itemId];
            if (!item.name || !item.name.length || !item.thumbnail || !item.thumbnail.length) {
              console.log(itemId, "has no name or thumbnail!", item);
            } else {
              item.id = itemId;
              item.corpus = corpus;
              items.push(item);
            }
          }
        }
      }
      this.setState({items:items.sort(by('name'))});
    });
  }
}

function Item(props) {
  let uri = '/item/' + props.id;
  return (
    <div className="Item">      
      <Link to={uri}>
        <img src={props.thumbnail} alt={props.name} />
      </Link>     
      <div className="Info">{props.name}</div>
    </div>
  );
}

export default Corpora;
