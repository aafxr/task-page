export const fileReader = {}

fileReader.canUse = function()
{
    return !!window.FileReader;
};
