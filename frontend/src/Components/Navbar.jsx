const Navbar = () => {
    return ( 
        <div className="">
            <div className="flex justify-center text-white pt-14 ">
                <div className="flex items-center">
                <h1 className="text-yellow-400 text-2xl font-bold">Ticket3</h1>
                <a href="www.google.com" className="text-lg ml-7">Home</a>
                <a href="/host" className="text-lg ml-7">Host</a>
                <a href="www.google.com" className="text-lg ml-7 mr-7">Book</a>
                </div>
                <button className="text-xl text-black bg-yellow-400 rounded-2xl px-2 py-1">
                    Connect Wallet
                </button>
            </div>
        </div>
     );
}
 
export default Navbar;