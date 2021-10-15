import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [],
      nameDog: '',
      arrayDog: [],
    }
    this.fecthDog = this.fecthDog.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.saveImage = this.saveImage.bind(this);

  }

  componentDidMount() {
    if (localStorage.namedDogURL) {
      const parseStorage = JSON.parse(localStorage.namedDogURL);
      const lastDog = parseStorage[parseStorage.length - 1].message;
      this.setState({
        arrayDog: parseStorage,
        image: {message: lastDog},
      })
    } else {
      this.fecthDog();
    }
    
  }

  handleOnChange({target}) {
    const { name, value } = target;
    this.setState({
      [name]: value,

    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.image.message.includes("terrier")) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.image !== this.state.image) {
      // localStorage.setItem('dogUrl', this.state.image.message)
      const doguinho = this.state.image.message.split('/')[4];
      alert(doguinho);
    }

  }

  async fecthDog() {
      const requestReturn = await fetch('https://dog.ceo/api/breeds/image/random')
      const requestObject = await requestReturn.json();
      this.setState({
        image: requestObject,
      });
  } 

  saveImage() {
    const { 
      image: { message },
      nameDog,
      arrayDog
    } = this.state

    const dogInfo = { message, nameDog };
    const newArray = [...arrayDog, dogInfo];
    this.setState({ arrayDog: newArray, nameDog: '' });
    // this.setState({ nameDog: ''});
    localStorage.setItem('namedDogURL', JSON.stringify(newArray));
  }

  renderImageElement() {
    const { nameDog } = this.state;
    return (
      <div>
        <h1>Doguinhos</h1>
        <button type="button" onClick={this.fecthDog}>Novo doguinho</button>
        <div>
          <input
            type="text"
            name="nameDog"
            value={nameDog}
            onChange={ this.handleOnChange }
            placeholder="digite o nome do doguinho"
          />
          <button onClick={this.saveImage}>Salvar doguinho</button>
        </div>
        <div>
          <img src={this.state.image.message} alt="Doguinhos" className="image"/>
        </div>
      </div>
    )
  }

  render() {
    const { image } = this.state;
    const loadingElement = <div>Loading...</div>;

    return (
      <div>
        {!image ? loadingElement : this.renderImageElement() }
      </div>
    )
  }
}

export default App;
