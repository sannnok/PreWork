import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
  ///////////////////
  // Hack icon error
  //////////////////
  let DefaultIcon = L.icon({
      iconUrl: './assets/marker-icon.png',
      iconSize: [25, 40],
      iconAnchor: [13, 40], 
      shadowUrl: './assets/marker-shadow.png',
      shadowSize: [40, 65],
      shadowAnchor: [13, 65]  });

  L.Marker.prototype.options.icon = DefaultIcon;
  //////////////////
  //////////////////






var apiToken = "";
declare var L:any;
declare var omnivore: any;

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  searchStr: string = ''
  minLength: number = 3
  validate: boolean = false
  map: any
  marking: boolean = false
  polygoning: boolean = false

  triangling: boolean = false
  triangleAngleCount: number = 0
  triangleBoundsArray: any = []
  angleCount: number = 4
  polygonBoundsArray: any = []
  polygonAngleCount: number = 0
  // markerLayer: any

  constructor(private _router: Router,  private route: ActivatedRoute) {
    route.params.subscribe(params => this.initAfterRouteChange(params));
  } 

    ngOnInit() {
    this.plotActivity();
  }




  plotActivity(){
    // we initialize our POI
    var poi = {
      MarkerLat: 50.83953,
      MarkerLon: 3.00893,
      Points:[
        [50.8350323599712,3.01605538309851],
        [50.8440316400288,3.01605538309851],
        [50.8440316400288,3.00180461690153],   
        [50.8350323599712,3.00180461690153],
      ],
      TypeColor: "Blue"
    };

    var chisinau = [47.024167460856255, 28.834648132324222]


        var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        
        osm = L.tileLayer(osmUrl, {
        });

    // initialize the map on the "map" div with a given center and zoom
    this.map = L.map('mapid').setView(chisinau, 14).addLayer(osm);
    this.map.maxZoom =100;

    // Create layers
    var markerLayer = new L.layerGroup();
    var polygonLayer = L.layerGroup();

    // Adding them to map
    this.map.addLayer(markerLayer);
    this.map.addLayer(polygonLayer);

    // Create markers
    var marker = new L.marker(chisinau);
    
    // Adding them to map
    markerLayer.addLayer(marker);

    // Creating a circle
    var circle = L.circle([50.8350323599712, 3.00180461690151], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(this.map);

    var polygon = new L.Polygon(poi.Points, { 'weight': '1', 'fillColor': poi.TypeColor, 'color': poi.TypeColor })
    polygonLayer.addLayer(polygon); 


    var latlngs = [
        [50.8350323599712,3.016],
        [50.8440316400288,3.017],
        [50.8440316400288,3.018],   
    ];
    var polyline = L.polyline(latlngs, {color: 'red'}).addTo(this.map);
    // zoom the map to the polyline
    // this.map.fitBounds(polyline.getBounds());



    //**********************************************************************************
    //**********************************************************************************
    // Manual adding markers
    ////////////////////////

    let _thisObj = this
    this.map.on('click', function(e) {
      let mark = L.marker()
      // let polygon = L.polygon()


      //-------
      // Marker
      //-------

      if (_thisObj.getMarkingState()) {
        console.log('marking! ', _thisObj.getMarkingState())
        mark.setLatLng(e.latlng)
                  .bindPopup("Was clicked at " + e.latlng)
                  .openPopup();
        markerLayer.addLayer(mark)
        // .addTo(this.map)
        console.log('LatLng: ', e.latlng)
      }


      //-------
      // Triangle
      //-------

      if (_thisObj.getTrianglingState()) {
        // Manual adding polygones
        //////////////////////////

        // create a red polygon from an array of LatLng points
        if (_thisObj.triangleAngleCount<3){
         _thisObj.triangleBoundsArray.push(e.latlng)
         var polygon = L.polygon(_thisObj.triangleBoundsArray, {color: 'red'}).addTo(_thisObj.map)
         _thisObj.triangleAngleCount += 1
        }
        // zoom the map to the polygon
        // _thisObj.map.fitBounds(polygon.getBounds());
      }


      //-------
      // Polygon
      //-------

      if (_thisObj.getPolygoningState()) {
        // Manual adding polygones
        //////////////////////////

        // create a red polygon from an array of LatLng points
        if (_thisObj.polygonAngleCount<_thisObj.angleCount){
         _thisObj.polygonBoundsArray.push(e.latlng)
         if (_thisObj.polygonAngleCount === _thisObj.angleCount-1){
           var polygon = L.polygon(_thisObj.polygonBoundsArray, {color: 'red'}).addTo(_thisObj.map)
         }
         _thisObj.polygonAngleCount += 1
        } 
        // zoom the map to the polygon
        // _thisObj.map.fitBounds(polygon.getBounds());
      }
    console.log('latlang^ ', e.latlng)

    }); // this map onclick



  }

  getMarkingState(){
    return this.marking
  }
  getPolygoningState(){
    return this.polygoning
  }
  getTrianglingState(){
    return this.triangling
  }


  initAfterRouteChange(params: any) {
    // this.plotActivity();
    //this.marking = 
  }

  handleChange() {
  	console.log(this.searchStr)
  }


  zoomIn(){
    this.map.zoomIn()
  }

  zoomOut(){
    this.map.zoomOut() 
  }

  setMarker() {
    (this.marking) ? this.marking = false : this.marking = true
    console.log("markinig: ", this.marking)
    // this._router.navigate(['track/setMarker'])        
  }  
  setTriangle() {
    (this.triangling) ? this.triangling = false : this.triangling = true
    console.log("triangling: ", this.triangling)
    // this._router.navigate(['track/setTriangle'])    
    if (this.triangling){
      this.triangleBoundsArray = []
      this.triangleAngleCount = 0
    }    
  }
  setPolygon() {
    (this.polygoning) ? this.polygoning = false : this.polygoning = true
    console.log("polygoning: ", this.polygoning)
    // this._router.navigate(['track/setPolygon'])
    if (this.polygoning){
      this.polygonBoundsArray = []
      this.polygonAngleCount = 0
    }           
  }

  onMapClick() {
    // console.log('latlang^ ')
  }
}





