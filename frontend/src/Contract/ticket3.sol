// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventTicketing {
    struct Event {
        uint256 eventId;
        address host;
        string eventName;
        string eventLocation;
        uint256 totalTickets;
        uint256 ticketsSold;
        uint256 ticketPrice;
        uint256 eventDate;
        uint256 eventTime;
        bool isActive;
    }

    struct Ticket {
        uint256 eventId;
        address holder;
        uint256 ticketCount;
    }

    mapping(uint256 => Event) public events;
    mapping(address => uint256[]) public hostedEvents;
    mapping(uint256 => Ticket) public tickets;
    mapping(address => uint256) public earnings;
    uint256 public eventCount;
    uint256 public ticketCount;


    struct Withdrawal {
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => Withdrawal[]) public hostWithdrawnTransactions;

    address public ghostWallet;

    constructor() {
        ghostWallet = msg.sender;
    }

    event TicketsBooked(uint256 indexed eventId, address indexed buyer, uint256 ticketCount);

    function hostEvent(string memory _eventName, string memory _eventLocation, uint256 _totalTickets, uint256 _ticketPrice, uint256 _eventDate, uint256 _eventTime) public {
        require(_totalTickets > 0, "Total tickets must be greater than 0");
        require(_ticketPrice > 0, "Ticket price must be greater than 0");

        uint256 eventId = eventCount;
        Event memory newEvent = Event({
            eventId: eventId,
            host: msg.sender,
            eventName: _eventName,
            eventLocation: _eventLocation,
            totalTickets: _totalTickets,
            ticketsSold: 0,
            eventDate: _eventDate,
            eventTime: _eventTime,
            ticketPrice: _ticketPrice,
            isActive: true
        });

        events[eventId] = newEvent;
        hostedEvents[msg.sender].push(eventId);
        eventCount++;
    }

    function getHostedEvents() public view returns (uint256[] memory, string[] memory, string[] memory, uint256[] memory, uint256[] memory, bool[] memory) {
        uint256[] memory hostedEventIds = hostedEvents[msg.sender];
        uint256 hostedEventCount = hostedEventIds.length;
        uint256[] memory eventIds = new uint256[](hostedEventCount);
        string[] memory eventNames = new string[](hostedEventCount);
        string[] memory eventLocations = new string[](hostedEventCount);
        uint256[] memory ticketCounts = new uint256[](hostedEventCount);
        uint256[] memory eventTimes = new uint256[](hostedEventCount);
        bool[] memory isActive = new bool[](hostedEventCount);

        for (uint256 i = 0; i < hostedEventCount; i++) {
            uint256 eventId = hostedEventIds[i];
            eventIds[i] = eventId;
            eventNames[i] = events[eventId].eventName;
            eventLocations[i] = events[eventId].eventLocation;
            ticketCounts[i] = events[eventId].totalTickets - events[eventId].ticketsSold;
            eventTimes[i] = events[eventId].eventTime;
            isActive[i] = events[eventId].isActive;
        }

        return (eventIds, eventNames, eventLocations, ticketCounts, eventTimes, isActive);
    }

    function getAllEvents() public view returns (uint256[] memory, string[] memory, string[] memory, uint256[] memory, uint256[] memory, bool[] memory, address[] memory) {
        uint256 eventCount = eventCount;
        uint256[] memory eventIds = new uint256[](eventCount);
        string[] memory eventNames = new string[](eventCount);
        string[] memory eventLocations = new string[](eventCount);
        uint256[] memory totalTickets = new uint256[](eventCount);
        uint256[] memory eventTimes = new uint256[](eventCount);
        bool[] memory isActive = new bool[](eventCount);
        address[] memory hostAddresses = new address[](eventCount);

        for (uint256 i = 0; i < eventCount; i++) {
            eventIds[i] = events[i].eventId;
            eventNames[i] = events[i].eventName;
            eventLocations[i] = events[i].eventLocation;
            totalTickets[i] = events[i].totalTickets;
            eventTimes[i] = events[i].eventTime;
            isActive[i] = events[i].isActive;
            hostAddresses[i] = events[i].host;
        }

        return (eventIds, eventNames, eventLocations, totalTickets, eventTimes, isActive, hostAddresses);
    }


    function bookTickets(uint256 _eventId, uint256 _ticketCount) public payable isEventActive(_eventId) {
        require(_ticketCount > 0, "Ticket count must be greater than 0");
        require(_ticketCount <= events[_eventId].totalTickets - events[_eventId].ticketsSold, "Not enough available tickets");
        require(msg.value >= _ticketCount * events[_eventId].ticketPrice, "Incorrect value sent for ticket booking");

        uint256 totalPrice = _ticketCount * events[_eventId].ticketPrice;
        if (msg.value > totalPrice) {
            payable(msg.sender).transfer(msg.value - totalPrice);
        }

        Ticket storage newTicket = tickets[ticketCount];
        newTicket.eventId = _eventId;
        newTicket.holder = msg.sender;
        newTicket.ticketCount = _ticketCount;
        ticketCount++;

        events[_eventId].ticketsSold += _ticketCount;

        uint256 earningsForHost = totalPrice;
        earnings[events[_eventId].host] += earningsForHost;

        emit TicketsBooked(_eventId, msg.sender, _ticketCount);
    }

    function getUserTickets() public view returns (uint256[] memory, uint256[] memory, string[] memory, string[] memory, uint256[] memory, uint256[] memory) {
        uint256 userTicketCount = 0;
        uint256[] memory userTicketIds = new uint256[](ticketCount);
        uint256[] memory eventIds = new uint256[](ticketCount);
        string[] memory eventNames = new string[](ticketCount);
        string[] memory eventLocations = new string[](ticketCount);
        uint256[] memory ticketCounts = new uint256[](ticketCount);
        uint256[] memory eventTimes = new uint256[](ticketCount);

        for (uint256 i = 0; i < ticketCount; i++) {
            if (tickets[i].holder == msg.sender) {
                userTicketIds[userTicketCount] = i;
                eventIds[userTicketCount] = tickets[i].eventId;
                eventNames[userTicketCount] = events[tickets[i].eventId].eventName;
                eventLocations[userTicketCount] = events[tickets[i].eventId].eventLocation;
                ticketCounts[userTicketCount] = tickets[i].ticketCount;
                eventTimes[userTicketCount] = events[tickets[i].eventId].eventTime;
                userTicketCount++;
            }
        }

        assembly {
            mstore(userTicketIds, userTicketCount)
        }

        return (userTicketIds, eventIds, eventNames, eventLocations, ticketCounts, eventTimes);
    }

    function getAllHostedEvents() public view returns (uint256[] memory, string[] memory, string[] memory, uint256[] memory, uint256[] memory, bool[] memory, address[] memory) {
        uint256 hostedEventCount = hostedEvents[msg.sender].length;
        uint256[] memory eventIds = new uint256[](hostedEventCount);
        string[] memory eventNames = new string[](hostedEventCount);
        string[] memory eventLocations = new string[](hostedEventCount);
        uint256[] memory totalTickets = new uint256[](hostedEventCount);
        uint256[] memory eventTimes = new uint256[](hostedEventCount);
        bool[] memory isActive = new bool[](hostedEventCount);
        address[] memory hostAddresses = new address[](hostedEventCount);

        for (uint256 i = 0; i < hostedEventCount; i++) {
            uint256 eventId = hostedEvents[msg.sender][i];
            eventIds[i] = eventId;
            eventNames[i] = events[eventId].eventName;
            eventLocations[i] = events[eventId].eventLocation;
            totalTickets[i] = events[eventId].totalTickets;
            eventTimes[i] = events[eventId].eventTime;
            isActive[i] = events[eventId].isActive;
            hostAddresses[i] = events[eventId].host;
        }

        return (eventIds, eventNames, eventLocations, totalTickets, eventTimes, isActive, hostAddresses);
    }

     function withdrawEarnings() public {
        uint256 amount = earnings[msg.sender];
        require(amount > 0, "No earnings to withdraw");

        earnings[msg.sender] = 0;

        Withdrawal memory withdrawal = Withdrawal({
            amount: amount,
            timestamp: block.timestamp
        });

        hostWithdrawnTransactions[msg.sender].push(withdrawal);

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }

    function getHostWithdrawnTransactions() public view returns (Withdrawal[] memory) {
        return hostWithdrawnTransactions[msg.sender];
    }

    function getEventDetails(uint256 _ticketId) public view returns (uint256 eventId, address holder, uint256 ticketCount) {
        Ticket memory myTicket = tickets[_ticketId];
        return (myTicket.eventId, myTicket.holder, myTicket.ticketCount);
    }

    modifier isEventActive(uint256 _eventId) {
        require(events[_eventId].isActive && events[_eventId].totalTickets > events[_eventId].ticketsSold, "Event is not active or sold out");
        _;
    }
}