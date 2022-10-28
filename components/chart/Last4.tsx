import { PC, PT } from '../../common';
import { useSale4 } from '../../hooks/useSales';
import { useWindowSize } from '../../hooks/useWindowSize';
import {PhoneTop4} from '../table/sales';
import { AntTable } from '../ui/Table';

const Last4 = () => {

  const { columns, rows } = useSale4();

  const { width } = useWindowSize();

  if (width >= PC && PT < width) {
    return <AntTable pagination={false} columns={columns} rows={rows} />
  }

  return <PhoneTop4 rows={rows} />
}

export default Last4;