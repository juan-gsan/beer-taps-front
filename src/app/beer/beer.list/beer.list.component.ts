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

  loadDispensersEverySecond() {
    this.updateDispensersUsage = interval(1000).subscribe(() => {
      this.updateDispenser();
      this.dispenserService.getAllDispensers().subscribe((dispensers) => {
        this.items = dispensers;
        this.dispenserService.dispensers$.next(dispensers);
      });
    });
  }

  loadDispenserLastUpdate() {
    this.updateDispenser();
    this.dispenserService
      .getDispenserById(this.usage.dispenserId)
      .subscribe((dispenser) => {
        this.dispenser = dispenser;
        this.dispenser.status = !this.dispenser.status;
        this.dispenserService.dispenser$.next(this.dispenser);

        this.dispenserService.getAllDispensers().subscribe((dispensers) => {
          this.items = dispensers;
          this.dispenserService.dispensers$.next(this.items);
        });
      });
  }

  openDispenser() {
    this.usageService.openUsage(this.dispenser).subscribe((usage) => {
      this.dispenser.totalAmount = this.dispenser.totalAmount + usage.amount;
      this.dispenser.totalCost = this.dispenser.totalCost + usage.cost;

      this.usage = usage;
      this.usageService.usage$.next(usage);
      this.loadDispensersEverySecond();
    });
  }

  updateDispenser() {
    this.usageService.updateUsage(this.usage).subscribe((usage) => {
      this.usage = usage;
      this.usageService.usage$.next(usage);
      this.dispenserService
        .getDispenserById(this.usage.dispenserId)
        .subscribe((dispenser) => {
          this.dispenser = dispenser;
          this.dispenserService.dispenser$.next(dispenser);
        });
    });
  }

  closeDispenser() {
    this.updateDispensersUsage?.unsubscribe();

    this.usageService.closeUsage(this.usage).subscribe((usage) => {
      this.usage = usage;
      this.usageService.usage$.next(usage);
      this.dispenserService
        .getDispenserById(this.usage.dispenserId)
        .subscribe((dispenser) => {
          this.dispenser = dispenser;
          this.dispenserService.dispenser$.next(this.dispenser);
        });
    });
  }

  toggleStatus(item: Dispenser) {
    this.dispenser = item;
    if (!item.status) {
      this.openDispenser();
      item.status = !item.status;
      return;
    }

    this.loadDispenserLastUpdate();
    this.closeDispenser();
    item.timesUsed += 1;
  }
}
