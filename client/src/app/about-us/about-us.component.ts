import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  location : google.maps.LatLngLiteral ={ lat: 55.94866375896394, lng:-3.1998437643112507};
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };


  ngOnInit(){

    new google.maps.Marker({
      position: { lat: 55.94866375896394, lng:-3.1998437643112507},
      title:"Hello World!"
  });
  
  }
}
