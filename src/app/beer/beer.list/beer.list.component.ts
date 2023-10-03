import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { DispenserService } from 'src/app/services/dispenser.service';
import { UsageService } from 'src/app/services/usage.service';
import { Dispenser } from 'src/models/dispenser';
import { DispenserUsage } from 'src/models/dispenser.usage';

@Component({
  selector: 'app-beer.list',
  templateUrl: './beer.list.component.html',
  styleUrls: ['./beer.list.component.scss'],
})
export class BeerListComponent implements OnInit {
  items: Dispenser[] = [];
  dispenser: Dispenser = {} as Dispenser;
  usage: DispenserUsage = {} as DispenserUsage;
  updateDispensersUsage: Subscription | undefined;
  constructor(
    public dispenserService: DispenserService,
    public usageService: UsageService
  ) {}

  ngOnInit(): void {
    this.loadAllDispensers();
  }

  loadAllDispensers(): void {
    this.dispenserService.getAllDispensers().subscribe((dispensers) => {
      this.items = dispensers;
      this.dispenserService.dispensers$.next(dispensers);
    });
  }

  loadDispensersEverySecond(item: DispenserUsage) {
    this.updateDispensersUsage = interval(1000).subscribe(() => {
      this.updateDispenser(item);
      this.dispenserService.getAllDispensers().subscribe((dispensers) => {
        this.items = dispensers;
        this.dispenserService.dispensers$.next(dispensers);
        console.log(dispensers);
      });
    });
  }

  openDispenser(item: Dispenser) {
    this.usageService.openUsage(item).subscribe((usage) => {
      item.totalAmount = item.totalAmount + usage.amount;
      item.totalCost = item.totalCost + usage.cost;
      this.usage = usage;
      this.usageService.usage$.next(usage);
      this.loadDispensersEverySecond(usage);
    });
  }

  updateDispenser(item: DispenserUsage) {
    this.dispenserService
      .getDispenserById(item.dispenserId)
      .subscribe((dispenser) => {
        this.dispenser = dispenser;
        this.dispenserService.dispenser$.next(dispenser);
      });
    this.usageService.updateUsage(item).subscribe((usage) => {
      this.usage = usage;
      this.usageService.usage$.next(usage);
    });
  }

  closeDispenser(item: DispenserUsage) {
    this.dispenserService
      .getDispenserById(item.dispenserId)
      .subscribe((dispenser) => {
        this.dispenser = dispenser;
        this.dispenserService.dispenser$.next(dispenser);
      });
    this.usageService.updateUsage(item).subscribe((usage) => {
      this.usage = usage;
      this.usageService.usage$.next(usage);
    });

    this.updateDispensersUsage?.unsubscribe();
  }

  toggleStatus(item: Dispenser, usage: DispenserUsage) {
    if (!item.status) {
      this.openDispenser(item);
    }

    if (item.status) {
      this.closeDispenser(usage);
    }

    this.dispenserService
      .manageDispenserStatus(item)
      .subscribe(() => (item.status = !item.status));
  }
}
