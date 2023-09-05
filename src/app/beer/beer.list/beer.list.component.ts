import { Component, OnInit } from '@angular/core';
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
  usage: DispenserUsage = {} as DispenserUsage;
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

  openDispenser(item: Dispenser) {
    this.usageService.openUsage(item).subscribe((usage) => {
      this.usage = usage;
      this.usageService.usage$.next(usage);
    });
  }

  closeDispenser(item: Dispenser) {
    this.usageService.closeUsage(item).subscribe((usage) => {
      this.usage = usage;
      this.usageService.usage$.next(usage);
    });
  }

  toggleStatus(item: Dispenser) {
    if (!item.status) {
      this.openDispenser(item);
    }

    if (item.status) {
      this.closeDispenser(item);
    }

    this.dispenserService
      .manageDispenserStatus(item)
      .subscribe(() => (item.status = !item.status));
  }
}
