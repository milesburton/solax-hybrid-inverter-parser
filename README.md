# solax-hybrid-inverter-parser

    Simple nodeJS application to interact with the Solax Hybrid inverter.

    The application does the following
    * Scans for the inverter on the LAN
    * Connect to the socket server
    * Decodes uploadSensor packets sent to the debugging port
    * Maps sensor payload to JSON object
    * Prints json object to stdout
    
Build on RXJS, Socket library 