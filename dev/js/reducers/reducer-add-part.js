const initialState= [{
		key: 1,
	  	name: "Networking Basics",
		notes: "This chapter introduces the platform of data networks upon which our social and business relationships increasingly depend. The material lays the groundwork for exploring the services, technologies, and issues encountered by network professionals as they design, build, and maintain the modern network."
	 },
	 {
		key: 2,
	  	notes: "IPv4 and classfull/classless IP addressing, cidr, vlsm, binary notation, subnets, masks, wildcard or inverse mask, ANDing, XoR ",
		name: "IPV4"
	 },
	 {
		key: 3,
	  	notes: "the new standard for worldwide ip addressing",
		name: "IPv6"
	 },
	 {
		key: 4,
	  	notes: "Router configuration and setup",
		name: "Router Configuration"
	 },
	 {
		key: 5,
	  	notes: "Switch Configuration info",
		name: "Switch configuration"
	 },
	 {
		key: 6,
	  	notes: "VLANs, including details of what a vlan is, how to set up etc..",
		name: "VLANs"
	 }]
}


const addPart = (state = initialState, action) => {
	 console.log('add part ',action,state,initialState)
	if( action.type==='ADD_PART_SELECTED') {
		console.log('add part was selected',action.payload);

		return action.payload;
	}

	return state;
}

export default addPart;