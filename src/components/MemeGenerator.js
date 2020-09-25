import React, {Component} from 'react'

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText:'',
            bottomText:'',
            randomImg:'http://i.imgflip.com/1bij.jpg',
            allMemeImgs:[]
        }
        this.handelChange = this.handelChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handelChange(event) {
        const {name,value} = event.target
        this.setState({
            [name] : value
        })
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            console.log(memes[0])
            this.setState({allMemeImgs : memes})
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({randomImg:randMemeImg})
    }

    render() {
        return (
            <div>
                <form className='meme-form' onSubmit={this.handleSubmit}>
                    <input
                    value={this.state.topText}
                    type="text"
                    name='topText'
                    placeholder='Top Text'
                    onChange={this.handelChange}
                    />

                    <input
                    value={this.state.bottomText}
                    type="text"
                    name='bottomText'
                    placeholder='Bottom Text'
                    onChange={this.handelChange}
                    />
                    <button>Gen</button>
                </form>
                <div className='meme'>
                    <img src = {this.state.randomImg} alt=''/>
                    <h2 className='top'>{this.state.topText}</h2>
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator
