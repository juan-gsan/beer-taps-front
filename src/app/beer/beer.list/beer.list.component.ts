import { Component, OnInit } from '@angular/core';
import { DispenserService } from 'src/app/services/dispenser.service';
import { Dispenser } from 'src/models/dispenser';

@Component({
  selector: 'app-beer.list',
  templateUrl: './beer.list.component.html',
  styleUrls: ['./beer.list.component.scss'],
})
export class BeerListComponent implements OnInit {
  items: Dispenser[] = [];
  constructor(public dispenserService: DispenserService) {}

  ngOnInit(): void {
    this.loadAllDispensers();
  }

  loadAllDispensers(): void {
    this.dispenserService.getAllDispensers().subscribe((dispensers) => {
      this.items = dispensers;
      this.dispenserService.dispensers$.next(dispensers);
    });
  }

  toggleStatus(item: Dispenser) {
    item.status = !item.status;

    // Call a service method to update the item's status on the server (if needed)
    // For example, you might want to send an HTTP request to update the status.
    // This depends on your backend implementation.
    // this.dispenserService.updateDispenserStatus(item).subscribe(
    //   () => {
    //     // Success callback, if needed
    //   },
    //   (error) => {
    //     // Handle error, if needed
    //   }
    // );
  }
}
