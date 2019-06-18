pragma solidity 0.5.0;

contract Swop {
    address payable public owner;
    address payable public swopper;
    // address payable public poster;
    
    struct BookingInfo {
        address payable poster;
        string company;
        uint256 Date;
        uint256 amount;
    }
    
    mapping (address => BookingInfo) booking;
    
    constructor () public payable {
        owner = msg.sender;
    }
    
    event swapBookingEvent(address swopper, address poster, uint256 amount);
    event refundBookingEvent(address owner, address swopper, uint256 amount);
    
    modifier onlyOwner {
        require(owner == msg.sender, "You are not the owner");
        _;
        
    }
    
    function postBooking (string memory company, uint256 Date, uint256 amount) public payable {
        booking[msg.sender].poster = msg.sender;
        booking[msg.sender].company = company;
        booking[msg.sender].Date = Date;
        booking[msg.sender].amount = amount;
    }
    
    //This function adds a 10% admin fee for the amount posted
    function addAdminFee (uint256 amount) private pure returns (uint256 _amountwithfee) {
        _amountwithfee = amount + (amount*10)/100;
    }
    
    function getAdminfee (uint256 amount) private pure returns (uint256 _adminfee) {
        _adminfee = (amount*10)/100;
    }
    
    function retrieveBooking (address poster) public view returns (string memory _company, uint256 _Date, uint256 _amount) {
        _company = booking[poster].company;
        _Date = booking[poster].Date;
        _amount = addAdminFee(booking[poster].amount);
    }
    
    function swapBooking (address payable to) public payable {
        // poster = to;
        swopper = msg.sender;
        to.transfer(booking[to].amount);
        owner.transfer(getAdminfee(booking[to].amount));
        emit swapBookingEvent(swopper, to, booking[to].amount);
    }
    
    function refundBooking (address poster, address payable to) public payable onlyOwner {
        to.transfer(getAdminfee(booking[poster].amount));
        emit refundBookingEvent(owner, to, booking[poster].amount);
    }
}