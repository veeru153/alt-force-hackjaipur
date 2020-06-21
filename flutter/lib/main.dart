import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'dart:async';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';
import 'package:geolocator/geolocator.dart';

List _data;
List _covid;
List _nonCovid;

void main() async {

  WidgetsFlutterBinding.ensureInitialized();

  _data = await getAllHospital();
  _covid = await getCovidHospital();
  _nonCovid = await getNonCovidHospital();

  print(_data.length);
  print(_covid.length);
  print(_nonCovid.length);



  runApp(new MaterialApp(
    title: 'EasyHospital',
    home: new hospital(),
  ));
}

//main screen
class hospital extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('EasyHospital'),
        centerTitle: true,
        backgroundColor: Colors.blueAccent,
      ),
      body: new Column(
        children: <Widget>[
          new Padding(padding: EdgeInsets.all(15.0)),
          new Text(
            'Choose your preference',
            style: new TextStyle(fontSize: 15.0),
          ),
          new Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              new MaterialButton(
                onPressed: () {
//                                    _getCurrentLocationCovid();
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => covidHospitals()),
                  );
                },
                color: Colors.redAccent,
                child: new Text(
                  'Covid hospitals',
                  style: new TextStyle(color: Colors.white),
                ),
              ),
              new Padding(padding: EdgeInsets.all(5.0)),
              new MaterialButton(
                onPressed: () {
//                  _getCurrentLocationNonCovid();
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => noncovidHospitals()),
                  );
                },
                color: Colors.greenAccent.shade700,
                child: new Text(
                  'Non-Covid hospitals',
                  style: new TextStyle(color: Colors.white),
                ),
              ),
            ],
          ),
          new Padding(padding: EdgeInsets.all(15.0)),
          new Expanded(
              child: new ListView.builder(
            itemCount: _data.length,
            padding: const EdgeInsets.all(5.0),
            itemBuilder: (BuildContext context, int position) {
//                                if (position.isOdd) return new Divider();
              final index = position;
              return new ListTile(
                title: new Text(
                  "${_data[index]['hospital_name']}",
                  style: new TextStyle(
                      fontSize: 15.5,
                      color: Colors.redAccent,
                      fontWeight: FontWeight.w500),
                ),
                subtitle: new Text(
                    'Accepting Covid patient: ${_data[index]['accepting_covid_patients']}\n'
                    'Empty beds: ${_data[index]['empty_beds']}\n'
                    'Empty Covid beds: ${_data[index]['empty_covid_beds']}\n'
                    'Empty Ventilators: ${_data[index]['empty_ventilators']}\n'),
                onTap: () {
                  _showAlertMessage(
                      context,
                      "${_data[index]['email']}",
                      "${_data[index]['latitude']}",
                      "${_data[index]['longitude']}");
                },
              );
            },
          ))
        ],
      ),
    );
  }
}

//  onTap show pop up
void _showAlertMessage(
    BuildContext context, String message, String lat, String long) {
  var latHos = double.parse(lat);
  var longHos = double.parse(long);

  var alert = new AlertDialog(
    title: new Text(
      'Hospital Details',
      textAlign: TextAlign.center,
    ),
    content: new Text(message),
    actions: <Widget>[
      new FlatButton(
          onPressed: () {
//            MapUtils.openMap(-3.823216, -38.481700);  // example
            MapUtils.openMap(latHos, longHos); // fetch lat and long from API
//            MapUtils.openMap(_data[0]['latitude'] is String ? double.parse(_data[0]['latitude']) : _data[0]['latitude'], _data[0]['longitude'] is String ? double.parse(_data[0]['longitude']) : _data[0]['longitude']);
          },
          child: new Text('Navigate')),
      new FlatButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: new Text('Return'))
    ],
  );
  showDialog(context: context, child: alert);
}

//this is for map navigation to work
class MapUtils {
  MapUtils._();

  static Future<void> openMap(double latitude, double longitude) async {
    String googleUrl =
        'https://www.google.com/maps/search/?api=1&query=$latitude,$longitude';
    if (await canLaunch(googleUrl)) {
      await launch(googleUrl);
    } else {
      throw 'Could not open the map.';
    }
  }
}

//this fetches all the stuff from API both covid and non covid
Future<List> getAllHospital() async {
  String apiUrl =
      'http://alt-force-hack-jaipur.herokuapp.com/api/hospital/?format=json';
  http.Response response = await http.get(apiUrl);
  return jsonDecode(response.body);
}

//  http://alt-force-hack-jaipur.herokuapp.com/api/hospital/?covid=yes&format=json&lat=37.4219983&long=-122.084   FORMAT OF DATA RETRIEVAL

//this fetches all the stuff from Covid app API
Future<List> getCovidHospital() async {
  final position = await Geolocator()
      .getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
  String apiUrl =
        'https://alt-force-hack-jaipur.herokuapp.com/api/hospital/?covid=yes&format=json&lat=${position.latitude}&long=${position.longitude}';
//      'https://alt-force-hack-jaipur.herokuapp.com/api/hospital/?covid=yes&format=json&lat=0.0&long=0.0';

  http.Response response = await http.get(apiUrl);
  return jsonDecode(response.body);
}

//this fetches all the stuff from Non Covid app API
Future<List> getNonCovidHospital() async {
  final position = await Geolocator()
      .getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
  String apiUrl =
        'https://alt-force-hack-jaipur.herokuapp.com/api/hospital/?covid=no&format=json&lat=${position.latitude}&long=${position.longitude}';
//      'https://alt-force-hack-jaipur.herokuapp.com/api/hospital/?covid=no&format=json&lat=0.0&long=0.0';
  http.Response response = await http.get(apiUrl);
  return jsonDecode(response.body);
}

//Geolocator to fetch current location of device
void _getCurrentLocationCovid() async {
  final position = await Geolocator()
      .getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
  print(position);

  String url =
      'http://alt-force-hack-jaipur.herokuapp.com/api/hospital/?covid=yes&format=json&lat=${position.latitude}&long=${position.longitude}';
  if (await canLaunch(url)) {
    await launch(url);
  } else {
    throw 'Could not launch $url';
  }
}

void _getCurrentLocationNonCovid() async {
  final position = await Geolocator()
      .getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
  print(position);

  String url =
      'http://alt-force-hack-jaipur.herokuapp.com/api/hospital/?covid=no&format=json&lat=${position.latitude}&long=${position.longitude}';
  if (await canLaunch(url)) {
    await launch(url);
  } else {
    throw 'Could not launch $url';
  }
}

//  onTap CovidHospital
class covidHospitals extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Covid Hospitals"),
        centerTitle: true,
        backgroundColor: Colors.redAccent,
      ),
      body: new Column(
        children: <Widget>[
          new Padding(padding: EdgeInsets.all(15.0)),
          new Text(
            'List of hospitals accepting Covid patients, close to you',
            style: new TextStyle(fontSize: 15.0),
          ),

          new Padding(padding: EdgeInsets.all(15.0)),
//
          new Expanded(
              child: new ListView.builder(
            itemCount: _covid.length,
            padding: const EdgeInsets.all(5.0),
            itemBuilder: (BuildContext context, int position) {
//                                if (position.isOdd) return new Divider();
              final index = position;
              return new ListTile(
                title: new Text(
                  "${_covid[index]['hospital_name']}",
                  style: new TextStyle(
                      fontSize: 15.5,
                      color: Colors.redAccent,
                      fontWeight: FontWeight.w500),
                ),
                subtitle: new Text(
                    'Accepting Covid patient: ${_covid[index]['accepting_covid_patients']}\n'
                    'Empty beds: ${_covid[index]['empty_beds']}\n'
                    'Empty Covid beds: ${_covid[index]['empty_covid_beds']}\n'
                    'Empty Ventilators: ${_covid[index]['empty_ventilators']}\n'),
                onTap: () {
                  _showAlertMessage(
                      context,
                      "${_covid[index]['email']}",
                      "${_covid[index]['latitude']}",
                      "${_covid[index]['longitude']}");
                },
              );
            },
          ))
        ],
      ),
    );
  }
}

//  onTap Non-CovidHospital
class noncovidHospitals extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Non-Covid Hospitals"),
        centerTitle: true,
        backgroundColor: Colors.greenAccent.shade700,
      ),
      body: new Column(
        children: <Widget>[
          new Padding(padding: EdgeInsets.all(15.0)),
          new Text(
            'List of hospitals accepting non-Covid patients, close to you',
            textAlign: TextAlign.center,
            style: new TextStyle(fontSize: 15.0),
          ),

          new Padding(padding: EdgeInsets.all(15.0)),
//
          new Expanded(
              child: new ListView.builder(
            itemCount: _nonCovid.length,
            padding: const EdgeInsets.all(5.0),
            itemBuilder: (BuildContext context, int position) {
//                                if (position.isOdd) return new Divider();
              final index = position;
              return new ListTile(
                title: new Text(
                  "${_nonCovid[index]['hospital_name']}",
                  style: new TextStyle(
                      fontSize: 15.5,
                      color: Colors.redAccent,
                      fontWeight: FontWeight.w500),
                ),
                subtitle: new Text(
                    'Accepting Covid patient: ${_nonCovid[index]['accepting_covid_patients']}\n'
                    'Empty beds: ${_nonCovid[index]['empty_beds']}\n'
                    'Empty Covid beds: ${_nonCovid[index]['empty_covid_beds']}\n'
                    'Empty Ventilators: ${_nonCovid[index]['empty_ventilators']}\n'),
                onTap: () {
                  _showAlertMessage(
                      context,
                      "${_nonCovid[index]['email']}",
                      "${_nonCovid[index]['latitude']}",
                      "${_nonCovid[index]['longitude']}");
                },
              );
            },
          ))
        ],
      ),
    );
  }
}
