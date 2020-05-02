/**********************************************
List Pagination and Filtering
Developed by: James Estrada 

Search and display students through pagination.
***********************************************/

'use strict';
const studentList = document.querySelectorAll('.student-item');
const itemsPerPage = 10;

/**
 * Hides all students in the list except for ten on a given page.
 * 
 * @param {NodeList} list - The list of students.
 * @param {number} page  - The page number.
 */
const showPage = (list, page) => {
   const start = (page * itemsPerPage) - itemsPerPage;
   const end = page * itemsPerPage;

   for (let i = 0; i < list.length; i += 1) {
      if (i >= start && i < end){
         // Display students of that page as long as there are students.
         if (list[i]) {
            list[i].style.display = '';
         }
      } else {
         list[i].style.display = 'none';
      }
   }
};

showPage(studentList, 1);

/**
 * Creates and appends functioning pagination buttons.
 * 
 * @param {NodeList} list - The list of students.
 */
const appendPageLinks = list => {
   const numberOfStudents = list.length;
   // Create a div with class name 'pagination' and append it to the div with class name 'page'
   const pageDiv = document.querySelector('div.page');
   const paginationDiv = document.createElement('div');
   paginationDiv.className = 'pagination';
   pageDiv.appendChild(paginationDiv);

   // Create ul element with li elements depending on #of students and append it to new div
   const ul = document.createElement('ul');
   const pages = Math.ceil(numberOfStudents / itemsPerPage);
   for (let i = 1; i <= pages; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.setAttribute('href', '#');
      a.textContent = i;
      li.appendChild(a);
      ul.append(li);
   }
   ul.children[0].firstElementChild.className = 'active'; // Set the class name 'active' to the <a> tag of the first li
   paginationDiv.appendChild(ul);

   // Set up an event listener on every <a> tag inside the <li>s of the ul.
   const lis = ul.children;
   for (const li of lis) {
      const a = li.firstElementChild;
      a.addEventListener('click', () => {
         for (let i = 0; i < lis.length; i++) {
            lis[i].firstElementChild.classList.remove('active');
         }
         a.className = 'active';
         showPage(list, a.textContent);
      });
   }
};

appendPageLinks(studentList);