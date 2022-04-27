const Item = ({ data }) => {
  return (
    <tr>
      {data.map((attr, index) => {
        return (
          <td key={index} className={`col_${index}`}>
            {attr}
          </td>
        );
      })}
    </tr>
  );
};

export default Item;
