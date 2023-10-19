const Navbar = () => {
    return ( 
        <div className="pt-12 ml-96 mr-96 px-20">
            <div className="flex justify-center text-white pt-2  pb-2  bg-white/30 rounded-full">
                <div className="flex items-center ">
                <h1 className="text-yellow-400 text-2xl font-bold">Ticket3</h1>
                <a href="www.google.com" className="text-lg ml-7">Home</a>
                <a href="www.google.com" className="text-lg ml-7">Host</a>
                <a href="www.google.com" className="text-lg ml-7 mr-7">Book</a>
                </div>
                <button className="text-xl text-black font-semibold border-2 border-yellow-400 bg-yellow-400  rounded-2xl px-3 py-1 hover:bg-black hover:border-2 hover:text-yellow-400 hover:border-yellow-400">
                    Connect Wallet
                </button>
            </div>
        </div>
     );
}
 
export default Navbar;