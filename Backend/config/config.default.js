"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appInfo) => {
    const config = {};
    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = `${appInfo.name}_Aelita`;
    config.serverTimeout = 10000;
    // add your egg config in here
    config.middleware = [];
    // file
    config.multipart = {
        mode: 'file',
        fileExtensions: ['.xlsx']
    };
    // add your special config in here
    const bizConfig = {};
    // the returned config will combine to EggAppConfig
    return {
        ...config,
        ...bizConfig
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWcuZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGtCQUFlLENBQUMsT0FBbUIsRUFBOEIsRUFBRTtJQUNqRSxNQUFNLE1BQU0sR0FBK0IsRUFBRSxDQUFBO0lBRTdDLDBDQUEwQztJQUMxQyx1RUFBdUU7SUFDdkUsTUFBTSxDQUFDLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLFNBQVMsQ0FBQTtJQUV0QyxNQUFNLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQTtJQUU1Qiw4QkFBOEI7SUFDOUIsTUFBTSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUE7SUFFdEIsT0FBTztJQUNQLE1BQU0sQ0FBQyxTQUFTLEdBQUc7UUFDakIsSUFBSSxFQUFFLE1BQU07UUFDWixjQUFjLEVBQUUsQ0FBQyxPQUFPLENBQUM7S0FDMUIsQ0FBQTtJQUVELGtDQUFrQztJQUNsQyxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUE7SUFFcEIsbURBQW1EO0lBQ25ELE9BQU87UUFDTCxHQUFHLE1BQU07UUFDVCxHQUFHLFNBQVM7S0FDYixDQUFBO0FBQ0gsQ0FBQyxDQUFBIn0=