// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: folder;
module.exports = storeName => {
    const files = FileManager.iCloud();
    const documents = files.documentsDirectory();
    const stores = `${documents}/stores`;
    const store = `${stores}/${storeName}`;
  
    if (!files.isDirectory(stores)) {
      files.createDirectory(stores);
    }
  
    if (!files.fileExists(store)) {
      files.writeString(store, '');
    }
  
    const set = (key, value) =>
      files.writeExtendedAttribute(
        store,
        JSON.stringify(value),
        key
      );
  
    const get = key =>
      JSON.parse(
        files.readExtendedAttribute(store, key)
      );
  
    const remove = key =>
      files.removeExtendedAttribute(store, key);
  
    return { set, get, remove };
  };