import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  signInBox: {
    width: '80%',
    padding: 20,
    backgroundColor: '#A7D7C5', 
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  signUpBox: {
    width: '80%',
    padding: 20,
    backgroundColor: '#A7D7C5', 
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#FFF',
  },
  button: {
    width: '60%',
    height: 40,
    backgroundColor: '#A3C9F2', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 20,
    color: '#A3C9F2',
    fontWeight: 'bold',
  },

  // Estilos para la pantalla HomeScreen
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#C3E4DD', 
  },
  infoBox: {
    width: '70%', 
    backgroundColor: '#A7D7C5',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center', 
  },
  infoLabel: {
    fontSize: 18,
    color: '#333',
  },
  infoValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },

  // Estilos para la pantalla CreatorMenuScreen
  projectCard: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  projectInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  projectText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  detailsButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#A7D7C5',
    borderRadius: 5,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  newProjectButton: {
    width: '80%',
    padding: 15,
    backgroundColor: '#A7D7C5',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  newProjectButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exploreTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  
  searchContainer: {
    flexDirection: 'row',
    width: '90%',
    marginBottom: 15,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  searchButton: {
    height: 40,
    marginLeft: 10,
    paddingHorizontal: 15,
    backgroundColor: '#A7D7C5',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  // Estilos de los filtros con Picker
  filterContainer: {
    flexDirection: 'column', 
    width: '90%',
    marginBottom: 15,
  },
  pickerContainer: {
    width: '100%', 
    minWidth: 150, 
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 5,
  },
  picker: {
    width: '100%',
    minWidth: 150, 
    color: '#333',
  },
});

export default styles;