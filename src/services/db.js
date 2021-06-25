import Firebase from 'gatsby-plugin-firebase'
import { isBrowser } from '../utils'

export default isBrowser ? Firebase : {
  auth: () => { return {currentUser: ''}},
  firestore: () => {}
};
