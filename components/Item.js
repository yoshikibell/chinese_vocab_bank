const Item = ({ data }) => {
  return (
    <tr>
      {data.map((attr, index) => {
        return <td key={index}>{attr}</td>;
      })}
    </tr>
  );
};

export default Item;
