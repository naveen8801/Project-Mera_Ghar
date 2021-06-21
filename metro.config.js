const {getDefaultConfig} = require('metro-config');
module.exports = (async () => {
    const defaultconfig = await getDefaultConfig();
    const {assetExts} = defaultconfig.resolver; 
    return {
        resolver : {
            assetExts : [...assetExts,'bin'],
        }
    }
})();
