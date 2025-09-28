export default function Layout(props){
    const {children} = props;
    const header = (
        <header>
            <div>
                <h1 className="text-gradient">KaffeeMeter</h1>
                <p>For Coffee Insatiates</p>
            </div>
                <button>
                    <p>Logout</p>
                </button>
         
                <button >
                    <p>Sign up free</p>
                    <i className="fa-solid fa-mug-hot"></i>
                </button>
            
        </header>
    )

    const footer = (
        <footer>
            <p><span className="text-gradient">KaffeeMeter</span> was made by <a target="_blank" href="https://www.smoljames.com">Smoljames</a> <br />using the <a href="https://www.fantacss.smoljames.com" target="_blank">FantaCSS</a> design library.<br />Check out the project on <a target="_black" href="https://www.github.com/jamezmca/reactjs-full-course">GitHub</a>!</p>
        </footer>
    )

  return (
    <>
      {header}
      <main>
        {children}
      </main>
      {footer}
    </>
  ) 
}