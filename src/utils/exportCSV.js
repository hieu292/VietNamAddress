import json2csv from 'json2csv';


const exportCSV = (data) => new Promise((resolve, reject) => {
  try {
    // Generate CSV
    const fields = ['key', 'streetName', 'ward', 'district', 'city', 'country'];
    const csvContent = json2csv({ data, fields });

    // Download
    let encodedUri = encodeURI(csvContent);
    encodedUri = `data:text/csv;charset=utf-8,\uFEFF${encodedUri}`;

    // Method 1:
    // window.open(encodedUri);
    //
    // Method 2:
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const now = new Date();
    link.setAttribute('download', `address_dataset-${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()}.csv`);
    document.body.appendChild(link); // Required for FF
    resolve(link);
  } catch (error) {
    reject(error);
  }
});

export default exportCSV;
