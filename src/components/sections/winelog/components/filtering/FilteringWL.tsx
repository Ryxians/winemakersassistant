import React, {FC} from 'react';

interface Props {

}

export const FilteringWl : FC<Props> = () => {
 return (
  <>
   <h3>Filtering</h3>
      <table className="table table-striped table-bordered border-dark text-start">
          <tbody>
          <tr>
              <td>Date: </td>
              <td>Vol. Level: </td>
              <td>Filter Media: </td>
          </tr>
          <tr>
              <td>Tank #: </td>
              <td colSpan={2}>Notes: </td>
          </tr>
          </tbody>
      </table>
  </>
 );
};