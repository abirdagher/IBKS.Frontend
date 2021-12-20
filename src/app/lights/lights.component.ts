import { Component, Inject } from '@angular/core';
import { Light } from '../light';
import { Room } from '../room';
import { Type } from '../type';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LightService } from '../light.service';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.css']
})
export class LightsComponent {
  lights: Light[] = [];
  rooms: Room[] = [];
  types: Type[] = [];

  loading: Boolean = false;

  columnsToDisplay = ['id', 'name', 'description', 'type', 'room', 'actions'];

  constructor(public dialog: MatDialog, private lightService: LightService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getLights();
    this.getRooms();
    this.getTypes();
  }

  getLights(): void {
    this.lightService.getLights().subscribe({
      next: (data) => this.lights = data,
      error: (e) => alert(e.statusText),
      complete: () => this.loading = false
    }
    );
  }

  getRooms() {
    this.lightService.getRooms().subscribe({
      next: (data) => this.rooms = data,
      error: (e) => console.log(e),
      complete: () => this.loading = false
    });
  }

  getTypes(): void {
    this.lightService.getTypes().subscribe({
      next: (data) => this.types = data,
      error: (e) => console.log(e),
      complete: () => this.loading = false
    });
  }

  openDialog(light?: Light): void {
    const dialogRef = this.dialog.open(DialogOverviewLight, {
      width: '250px',
      data: { light: light, rooms: this.rooms, types: this.types },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == null)
        return;
      let found = false;
      this.lights.forEach(element => {
        if (element.id == result.id) {
          this.lights[this.lights.indexOf(element)] = result;
          found = true;
        }
      });

      if (!found)
        this.lights.push(result);

      this.lights = [...this.lights];
    });

  }

  openMessageDialog(light: Light): void {
    const dialogMessageRef = this.dialog.open(DialogMessage, {
      width: '250px',
      data: { light: light },
    });

    dialogMessageRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.lights.forEach(element => {
          if (element.id == result.id)
            this.lights.splice(this.lights.indexOf(element), 1);
        });
        this.lights = [...this.lights];
      }
    });
  }
}

export interface DialogData {
  light: Light;
  rooms: Room[];
  types: Type[];
  warningMessage: string;
}
@Component({
  selector: 'dialog-overview-light',
  templateUrl: 'dialog-overview-light.html',
  styleUrls: ['./lights.component.css']
})
export class DialogOverviewLight {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewLight>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private lightService: LightService
  ) { }

  onNoClick(): void {
    this.data.warningMessage = "";
    this.dialogRef.close();
  }

  save(name: string, description: string, typeId: number, roomId: number): void {
    this.data.warningMessage = "";
    if (name == "") {
      this.data.warningMessage = "Name is required";
      return;
    }
    if (typeId == undefined) {
      this.data.warningMessage = "Type is required";
      return;
    }
    if (roomId == undefined) {
      this.data.warningMessage = "Room is required";
      return;
    }
    let light: Light = {
      id: this.data.light?.id,
      name: name,
      description: description,
      typeId: typeId,
      roomId: roomId,
    };
    this.lightService.saveLight(light).subscribe({
      next: (data) => this.dialogRef.close(data),
      error: (e) => console.log(e),
      complete: () => console.log('complete')
    });
  }
}

export interface DialogMessageData {
  light: Light;
}
@Component({
  selector: 'dialog-message',
  templateUrl: 'dialog-message.html',
  styleUrls: ['./lights.component.css']
})
export class DialogMessage {
  constructor(
    public dialogMessageRef: MatDialogRef<DialogMessage>,
    @Inject(MAT_DIALOG_DATA) public data: DialogMessageData,
    private lightService: LightService
  ) { }

  onNoClick(): void {
    this.dialogMessageRef.close();
  }

  deleteLight(): void {
    let id = this.data.light.id;
    if (id != null)
      this.lightService.deleteLight(id).subscribe({
        next: (data) => this.dialogMessageRef.close(data),
        error: (e) => console.log(e),
        complete: () => console.log('complete')
      });
  }
}
