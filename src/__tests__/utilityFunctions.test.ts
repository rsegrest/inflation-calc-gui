import * as util from '../util/formulas';

describe('utility functions test', () => {
    it('tests get lost value over time', () => {
        const yearRange = {
            fromYear: 2000,
            toYear: 2022,
        }
        const valueArray = util.lostValueOverTime(yearRange);
        expect(valueArray).toEqual([{"cpi": 168.8, "value": 1, "year": 2000}, {"cpi": 175.1, "value": 0.9640205596801829, "year": 2001}, {"cpi": 177.1, "value": 0.9531338226990402, "year": 2002}, {"cpi": 181.7, "value": 0.9290038525041278, "year": 2003}, {"cpi": 185.2, "value": 0.9114470842332615, "year": 2004}, {"cpi": 190.7, "value": 0.8851599370739383, "year": 2005}, {"cpi": 198.3, "value": 0.8512355017650025, "year": 2006}, {"cpi": 202.416, "value": 0.8339261718441231, "year": 2007}, {"cpi": 211.08, "value": 0.7996967974227781, "year": 2008}, {"cpi": 211.143, "value": 0.7994581871054215, "year": 2009}, {"cpi": 216.687, "value": 0.779003816564907, "year": 2010}, {"cpi": 220.223, "value": 0.7664957792782771, "year": 2011}, {"cpi": 226.665, "value": 0.7447113581717514, "year": 2012}, {"cpi": 230.28, "value": 0.7330206704881015, "year": 2013}, {"cpi": 233.916, "value": 0.721626566801758, "year": 2014}, {"cpi": 233.707, "value": 0.7222719045642622, "year": 2015}, {"cpi": 236.916, "value": 0.7124888146009557, "year": 2016}, {"cpi": 242.839, "value": 0.6951107523915022, "year": 2017}, {"cpi": 247.867, "value": 0.6810103805669977, "year": 2018}, {"cpi": 251.712, "value": 0.670607678616832, "year": 2019}, {"cpi": 257.971, "value": 0.6543371154121975, "year": 2020}, {"cpi": 261.582, "value": 0.6453043405127264, "year": 2021}, {"cpi": 281.148, "value": 0.6003955212201403, "year": 2022}]);
      }
    );

    // it('test get last month with data', () => {
    //   const latestMonthWithData = util.getLatestMonthWithData(1, 2026);
    //   expect(latestMonthWithData.latestMonth).toEqual(11);
    //   expect(latestMonthWithData.latestYear).toEqual(2025);
    // })
})

describe('JSON interface test', () => {
    it('tests getting CPI data by year', () => {
        const cpiData01 = util.getHistoricalCpi(2000);
        const cpiData02 = util.getHistoricalCpi(2022);
        // const cpiData01 = util.getHistoricalCpi(2000);
        // const cpiData02 = util.getHistoricalCpi(2022);
        expect(cpiData01).toEqual(168.8);
        expect(cpiData02).toEqual(281.148);
      }
    );
    xit('tests getting CPI data by year and month', () => {
        const cpiData01 = util.getHistoricalCpi(2000, 7);
        const cpiData02 = util.getHistoricalCpi(2019, 2);
        expect(cpiData01).toEqual(172.8);
        expect(cpiData02).toEqual(254.202);
      }
    );
})

