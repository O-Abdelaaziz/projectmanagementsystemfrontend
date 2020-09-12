import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Category } from 'src/app/modules/category';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $;
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  public category: Category = new Category();
  categories: Category[] = [];
  submitted: boolean = false;
  closeResult = '';
  search: string;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categories = [];
    this.getCategory();
    this.categoryService.refreshNeeded$.subscribe(() => {
      this.goToList();
    });
    this.goToList();
  }

  newCategory(): void {
    this.submitted = false;
    this.category = new Category();
  }

  getCategory() {
    this.activeRouter.params.subscribe((params) => {
      let uid = params['uid'];
      if (uid) {
        this.categoryService.getCategory(uid).subscribe((category) => {
          this.category = category;
        });
      }
    });
  }

  createCategory(): void {
    this.categoryService.saveCategory(this.category).subscribe(
      (data) => {
        this.opensweetalert(
          'Category',
          'The Category is add seccessfully in the database.'
        );
      },
      (error) => console.log('send error', error)
    );
    this.category = new Category();
    this.goToList();
  }

  onSubmit() {
    this.submitted = true;
    this.createCategory();
  }

  editeCategory() {
    this.categoryService.editeCategory(this.category).subscribe((response) => {
      //this.router.navigate(['/dashboard/customers'])
      this.opensweetalert(
        'Category',
        'The Category is updated seccessfully in the database.'
      );
    });
  }

  selectAllCategories() {
    return this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      $(() => {
        $('#example1').DataTable();
        $('#example2').DataTable({
          paging: true,
          lengthChange: false,
          searching: false /* optional */,
          ordering: true,
          info: true,
          autoWidth: false,
        });
      });
    });
  }

  goToList() {
    this.selectAllCategories();
  }

  deleteCustomer(category: Category) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: `You won't be able to delete this status \
       ${Category.name}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.categoryService
            .removeCategory(category.uid)
            .subscribe((response) => {
              this.categories = this.categories.filter(
                (cli) => cli !== category
              );
              swalWithBootstrapButtons.fire(
                'Deleted!',
                `<h1>your going to deletethis client</h1>\
               id= ${category.uid}\
               name= ${category.name}`,
                'success'
              );
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your Cancelled this operation',
            'error'
          );
        }
      });
  }

  opensweetalert(title: string, message: string) {
    Swal.fire(title, message, 'success');
  }

  getcurrentLabel(statusName: String) {
    var classList = '';
    if (statusName === 'not started') {
      classList = 'label label-default';
    } else if (statusName === 'in progress') {
      classList = 'label label-primary';
    } else if (statusName === 'in review') {
      classList = 'label label-warning';
    } else if (statusName === 'canceled') {
      classList = 'label label-danger';
    } else if (statusName === 'complete') {
      classList = 'label label-success';
    }
    return classList;
  }
}
