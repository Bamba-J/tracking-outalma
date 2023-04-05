
   export function include(fileName, fileName2){
       fileName="./jquery-3.2.1.min.js"
       fileName2="./jquery.dataTables.min.js"
        document.write("<script type='text/javascript' src='"+fileName+"'></script>" );
        document.write("<script type='text/javascript' src='"+fileName2+"'></script>" );
        (function() {
            $('#example').DataTable()
        } );
      }  
             
             