

import Bg from "../assets/lp.png"

const bg = {
    backgroundImage: `url(${Bg})`,
    backgroundSize: "cover"
}


const Home = () => {
    return (
        <div className="h-screen play-font" style={bg}>
          
            <main className="grid grid-cols-2">
                <div className="text-white font-semibold  mt-36 ml-10"> 
                    <h1 className="text-7xl" >Ticket3: Crypto Tickets, Your Way</h1>
                    <p className="text-lg  mt-8 mr-28">With Ticket3, you can book your tickets using crypto and get your own ticket quickly. Embrace the future of ticketing –   it's fast, secure, and entirely hassle-free.</p>
                    <a href="/events">
                    <button className="bg-white text-black mt-10 font-bold text-xl px-3 border-2 py-2 rounded-full hover:bg-black hover:border-2 hover:border-yellow-400 hover:text-yellow-400">Book Now</button>
                    </a>
                    <a href="/host">
                    <button className="ml-16 text-xl border-2 px-3 py-2 rounded-full hover:text-yellow-400 hover:border-yellow-400 ">Host Now </button>
                    </a>
                </div>
            </main>
            
        </div>
    );
}

export default Home;