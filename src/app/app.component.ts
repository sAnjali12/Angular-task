import { Component, DefaultIterableDiffer, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { User, UserColumns } from './model/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  displayedColumns: string[] = UserColumns.map((col) => col.key);
  columnsSchema: any = UserColumns;
  dataSource = new MatTableDataSource<User>();
  valid: any = {};

  constructor(public dialog: MatDialog, private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((res: any) => {
      console.log('res: ', res);
      this.dataSource.data = res;
      console.log('this.dataSource.data: ', this.dataSource.data);
    });
  }

  editRow(row: User) {
    console.log('row: ', row);
    let list = {
      name: row.name,
      job: row.job
    }
    if (row.id === 0) {
      this.userService.addUser(list).subscribe((res) => {
        console.log('res: ', res);
        this.ngOnInit()
        // row.id = newUser.id;
        // row.isEdit = false;
      });
    } else {
      // this.userService.updateUser(row).subscribe(() => (row.isEdit = false));
    }
  }

  addRow() {
    const newRow: User = {
      id: 0,
      name: '',
      job: '',
      isEdit: true,
      isSelected: false,
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  removeRow(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: User) => u.id !== id
      );
    });
  }


  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false);
    }
    return false;
  }
}
