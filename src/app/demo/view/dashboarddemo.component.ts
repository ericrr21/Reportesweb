import {Component, OnInit} from '@angular/core';
import {CarService} from '../service/carservice';
import {EventService} from '../service/eventservice';
import {Car} from '../domain/car';
import {SelectItem} from 'primeng/primeng';
import {BreadcrumbService} from '../../breadcrumb.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardDemoComponent implements OnInit {

    cities: SelectItem[];

    cars: Car[];

    cols: any[];

    chartData: any;

    events: any[];

    selectedCity: any;

    selectedCar: Car;

    scheduleOptions: any;

    constructor(private carService: CarService, private eventService: EventService, private breadcrumbService: BreadcrumbService) {
      this.breadcrumbService.setItems([
        {label: ''},
      ]); }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];

        this.eventService.getEvents().then(events => {this.events = events; });

        this.cities = [];
        this.cities.push({label: 'Seleccione su ciudad', value: null});
        this.cities.push({label: 'Zona metropolitana del Valle de México', value: {id: 1, name: 'New York', code: 'NY'}});
        this.cities.push({label: 'Guadalajara', value: {id: 2, name: 'Rome', code: 'RM'}});
        this.cities.push({label: 'Puebla', value: {id: 3, name: 'London', code: 'LDN'}});
        this.cities.push({label: 'Tijuana', value: {id: 4, name: 'Istanbul', code: 'IST'}});
        this.cities.push({label: 'Otra', value: {id: 5, name: 'Paris', code: 'PRS'}});

        this.chartData = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'],
            datasets: [
                {
                    label: 'Vistas de la página',
                    data: [2507, 3883, 4979, 6184, 7259, 8428, 8592, 9634],
                    fill: false,
                    borderColor: '#FFC107'
                },
                {
                    label: 'Segundas visitas',
                    data: [2358, 3489, 4167, 6190, 7086, 8027, 8142, 9327],
                    fill: false,
                    borderColor: '#03A9F4'
                }
            ]
        };

        this.scheduleOptions = {
            plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
            defaultDate: '2016-01-12',
            header: {
                left: 'prev,next, today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }
        };
    }
}
