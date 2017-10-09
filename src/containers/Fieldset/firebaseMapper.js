import { FirebaseList } from '../../firebase';
import {
  createAddressSuccess,
  loadAddressSuccess,
  updateAddressSuccess,
} from './actions';
import Address from './Address';


const AddressMapper = new FirebaseList({
  onAdd: createAddressSuccess,
  onChange: updateAddressSuccess,
  onLoad: loadAddressSuccess,
}, Address);

export default AddressMapper;
