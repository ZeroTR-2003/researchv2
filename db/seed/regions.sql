-- Seed regions for Namibia (14 regions)
insert into public.regions (name, code, latitude, longitude) values
  ('Khomas','KH',-22.560881,17.065755),
  ('Erongo','ER',-22.229999,15.000000),
  ('Oshana','OS',-17.735000,15.881000),
  ('Ohangwena','OH',-17.407000,16.010000),
  ('Omusati','OM',-17.650000,14.750000),
  ('Oshikoto','OT',-18.000000,16.500000),
  ('Kavango East','KE',-18.000000,20.800000),
  ('Kavango West','KW',-18.100000,18.600000),
  ('Zambezi','ZA',-17.500000,24.266667),
  ('Otjozondjupa','OJ',-20.500000,17.000000),
  ('Omaheke','OMH',-22.500000,19.500000),
  ('Hardap','HA',-24.200000,17.000000),
  ('Kunene','KU',-19.200000,13.500000),
  ('Karas','KA',-27.000000,18.000000)
  on conflict (name) do nothing;