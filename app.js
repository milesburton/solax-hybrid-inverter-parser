import scanner from 'portscanner';
import {Observable} from 'rxjs';
import net from 'net';

/*
    Simple nodeJS application to interact with the Solax Hybrid inverter.

    The application does the following
    * Scans for the inverter on the LAN
    * Connect to the socket server
    * Decodes uploadSensor packets sent to the debugging port
    * Maps sensor payload to JSON object
    * Prints json object to stdout
 */

const range = 254;
const port = 9003;


/*

{"method":"uploadsn","version":"Solax_SI_CH_2nd_20150902_DE01","type":"AL_SE","SN":"6466B4FB","Data":[1.7,1.4,198.6,224.5,1.4,247.4,274,32,1.7,3792.2,-19,337,314,48.20,6.25,301,54,19,0.0,1253.0,,,,,,,,,,,,,,,,,,,,,,0.00,0.00,,,,,,,,50.03,,,0.0,0.0,0,0.00,0],"Information":["3.700","null","              ","U37EC1046GB034"],"mac":"c893464e4849","Status":"2"}^
 */

/*
//multiple
{"SN":"6466B4FB","Data":[{"t":5,"d":[0.2,0.1,197.0,226.9,-1.3,246.0,38,32,2.0,3792.5,-792,39,22,47.74,-0.22,-11,53,19,0.0,1253.1,,,,,,,,,,,,,,,,,,,,,,0.00,0.00,,,,,,,,,,,0.0,0.0,0,0.00,0]},{"t":0,"d":[0.1,0.0,196.3,210.4,-1.2,246.0,15,32,2.0,3792.5,-814,19,0,47
.74,-0.22,-11,53,19,0.0,1253.1,,,,,,,,,,,,,,,,,,,,,,0.00,0.00,,,,,,,,,,,0.0,0.0,0,0.00,0]}]}
 */


const decodeJsonPayloadFromInverter = (buffer) => {

    // Quick and nasty code to read the buffer

    const jsonMessagesFromInverterArray = buffer
        .split('\n') // new line delimited message
        .filter(l => !!l) // remove empty lines
        .slice(-1) // The JSON message is on the last line
        .map(i => i.split(',').map(i => i === '' ? 0 : i).join(',')) // Fix broken JSON by replacing empty array elements with a 0
        .map((j) => {
            try {
                return JSON.parse(j);
            } catch (e) {
                console.log(e);
                return null;
            }
        }) // Attempt to parse the payload
        .filter(j => !!j) // Remove non-parsable payloads
        .filter(({method}) => !!method && method === 'uploadsn') // Ignore messages which are not uploadsn (ie sensor batch)
        .filter(({Data}) => !!Data) // Remove Objects which dont have a Data property
        .map(({Data}) => Data); // Get the data

    return jsonMessagesFromInverterArray;
};

const convertUploadSensorMessage = (uploadSensorArray) => {

    const [
        pv1Current,
        pv2Current,
        pv1Voltage,
        pv2Voltage,
        gridOutputCurrent,
        gridVoltage,
        pvOutputKwh,
        pv1Kwh,
        pv2Kwh,
        pvOutputKwhTotal,
        gridExportKwh,
        unknown2,
        unknown3,
        batteryVoltage,
        batteryCurrent,
        batteryExportKwh,
        batteryTemperatureC,
        batteryChargePercentage,
        unknown4,
        unknown6,
        ...others
    ] = uploadSensorArray;


    const valuesAsObject = {
        pv1Current,
        pv2Current,
        pv1Voltage,
        pv2Voltage,
        gridVoltage,
        gridOutputCurrent,
        pvOutputKwh,
        pv1Kwh,
        pv2Kwh,
        pvOutputKwhTotal,
        gridExportKwh,
        batteryVoltage,
        batteryCurrent,
        batteryExportKwh,
        batteryTemperatureC,
        batteryChargePercentage,
    };

    return valuesAsObject;
};

console.log("Scanning network");

Observable
    .range(1, range)
    .map((num) => `192.168.1.${num}`)
    .mergeMap((ip) => {

        const scan = scanner
            .checkPortStatus(port, ip);

        return Observable
            .fromPromise(scan)
            .filter((state) => state === 'open')
            .map(() => ip);

    })
    .take(1)
    .do(host => console.log(`Found Inverter: ${host}. Opening connection`))
    .mergeMap((host) => {

        const socket = net.createConnection(port, host);
        socket.setEncoding('utf8');

        return Observable
            .fromEvent(socket, 'data')
            .do(data => {

                console.log('--Data Received----------');
                console.log(encodeURI(data));
                console.log('--------------------------');

            })
            .map(decodeJsonPayloadFromInverter)
            .filter(jsonMessagesFromInverter => jsonMessagesFromInverter.length === 1)
            .map(jsonMessageFromInverter => convertUploadSensorMessage(jsonMessageFromInverter[0]))
            .do(valuesAsObject => console.log(JSON.stringify(valuesAsObject)))
            .takeUntil(Observable.fromEvent(socket, 'close'));

    })
    .subscribe((inverterStatus) => {

        // Do something to inverter status

    });



