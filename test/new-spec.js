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
});
