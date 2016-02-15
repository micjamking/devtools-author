describe('a new spec', function ()
{
  var a;

  beforeEach(function()
  {
    a = 1;
  });

  it ('equals 1', function()
  {
    expect(a).toEqual(1);
  });

  it ('chrome.storage API is defined', function()
  {
    expect(chrome.storage).toBeDefined();
  });

  it ('chrome.devtools API is defined', function()
  {
    expect(chrome.devtools).toBeDefined();
  });
});
