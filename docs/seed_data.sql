-- =====================================================
-- Bếp của Luật — Seed Data (Dữ liệu mẫu từ Supabase)
-- Được trích xuất tự động vào ngày 2026-05-29
-- =====================================================

-- ----- Dữ liệu mẫu cho bảng `profiles` -----
TRUNCATE TABLE profiles CASCADE; -- Dọn dẹp dữ liệu cũ tránh xung đột khóa ngoại

INSERT INTO profiles (id, user_id, full_name, avatar_url, created_at) VALUES ('6ff1b7af-f577-4472-9c7d-5ae5cde7330d', '9be6c8db-3eab-4283-b2e3-823f479aee28', 'Luật (Chủ Bếp)', NULL, '2026-05-27T06:25:26.766242+00:00');
INSERT INTO profiles (id, user_id, full_name, avatar_url, created_at) VALUES ('c52ad101-3dd4-46b7-b49f-98cbf16d45a6', 'e5efb2be-706c-4ac3-85e9-93e018d4bbe7', 'Cô Ba Bình Dương', NULL, '2026-05-27T06:25:27.426932+00:00');
INSERT INTO profiles (id, user_id, full_name, avatar_url, created_at) VALUES ('78dc5d5e-9baf-4b33-9cd0-297fb399b8d3', 'ead7477c-fc4a-4a79-b1c8-48a9ef9cc081', 'Đầu bếp Hoàng Huế', NULL, '2026-05-27T06:25:27.675208+00:00');
INSERT INTO profiles (id, user_id, full_name, avatar_url, created_at) VALUES ('d2668bff-06cf-4499-91a8-8b50e036ca36', '26de94ac-ef78-4850-a17e-53d205e2edc3', 'Mẹ Tôm Homecook', NULL, '2026-05-27T06:25:27.879439+00:00');
INSERT INTO profiles (id, user_id, full_name, avatar_url, created_at) VALUES ('cee99d15-65de-4a73-8be2-58116c605a4f', '19404fbe-f489-472c-9580-0551431a3372', 'Nguyen Thi Luat', NULL, '2026-05-28T18:56:42.353744+00:00');
INSERT INTO profiles (id, user_id, full_name, avatar_url, created_at) VALUES ('bf8bb08f-a9af-44a5-92aa-bde8e86bf621', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Nguyễn Thị Luật', NULL, '2026-05-29T06:32:03.543202+00:00');
INSERT INTO profiles (id, user_id, full_name, avatar_url, created_at) VALUES ('bfb3c9dd-e089-4062-8169-1e7745472553', 'e80553f1-727c-422d-b5b5-b5a61819c5ba', 'Đỗ Quốc Vương', NULL, '2026-05-29T08:44:47.350032+00:00');


-- ----- Dữ liệu mẫu cho bảng `recipes` -----
TRUNCATE TABLE recipes CASCADE; -- Dọn dẹp dữ liệu cũ tránh xung đột khóa ngoại

INSERT INTO recipes (id, user_id, title, description, cover_image_url, meal_type, cook_time_minutes, servings, difficulty, ingredients, steps, notes, tags, is_public, is_favorite, created_at, updated_at) VALUES ('64b36f2f-f4d3-485b-bd92-f32eda0c78f6', '9be6c8db-3eab-4283-b2e3-823f479aee28', 'Thịt Kho Tàu Trứng Cút', 'Món ăn gia đình ấm cúng với những miếng thịt ba chỉ béo ngậy được kho mềm rục, thấm đẫm nước dừa tươi ngọt ngào và những quả trứng cút đậm đà.', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60', 'trua', 60, 3, 'trung_binh', '[{"name": "Thịt ba chỉ heo", "quantity": "500g"}, {"name": "Trứng cút luộc chín bóc vỏ", "quantity": "15 quả"}, {"name": "Nước dừa xiêm tươi", "quantity": "400ml"}, {"name": "Hành tím, tỏi băm, ớt", "quantity": "2 thìa"}, {"name": "Nước màu, nước mắm, hạt nêm, tiêu", "quantity": "Vừa đủ"}]'::jsonb, '["Thịt ba chỉ cắt miếng vuông to (khoảng 4x4cm), rửa sạch rồi chần sơ qua nước sôi.", "Ướp thịt với hành tỏi băm, nước mắm, đường, tiêu và nước màu trong 30 phút.", "Cho thịt vào nồi đảo săn, sau đó đổ nước dừa tươi vào ngập mặt thịt.", "Kho nhỏ lửa đến khi thịt bắt đầu mềm thì cho trứng cút vào kho cùng.", "Nêm nếm lại cho vừa vị mặn ngọt hài hòa, kho tiếp đến khi nước kho sánh lại và thịt mềm tan."]'::jsonb, 'Kho bằng nước dừa tươi giúp thịt mềm nhanh hơn và nước kho có màu vàng cánh gián rất đẹp tự nhiên.', '["Thịt heo", "Trứng cút", "Cơm nhà", "Món mặn"]', TRUE, TRUE, '2026-05-27T06:23:47.202475+00:00', '2026-05-27T06:23:47.202475+00:00');
INSERT INTO recipes (id, user_id, title, description, cover_image_url, meal_type, cook_time_minutes, servings, difficulty, ingredients, steps, notes, tags, is_public, is_favorite, created_at, updated_at) VALUES ('69a4f430-d3b6-4e5b-922e-e8cbd947b7a4', 'ead7477c-fc4a-4a79-b1c8-48a9ef9cc081', 'Bún Bò Huế Sông Hương', 'Bún bò Huế đậm đà chuẩn vị cố đô với nước dùng ngọt đậm đà từ xương bò quyện lẫn mùi mắm ruốc chưng thơm phức, sợi bún to ăn kèm giò heo béo ngậy.', 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=800&auto=format&fit=crop&q=60', 'sang', 120, 5, 'kho', '[{"name": "Sợi bún bò to", "quantity": "1kg"}, {"name": "Xương ống và giò heo", "quantity": "1.2kg"}, {"name": "Nạm bò, chả cua Huế", "quantity": "500g"}, {"name": "Mắm ruốc Huế thơm", "quantity": "3 thìa"}, {"name": "Sả tươi, ớt bột băm, hạt điều màu", "quantity": "1 ít"}, {"name": "Rau răm, hoa chuối bào, giá đỗ", "quantity": "1 ít"}]'::jsonb, '["Chần sạch xương ống và chân giò heo, đem ninh nhỏ lửa liên tục trong 2 tiếng cùng sả cây đập dập.", "Hòa mắm ruốc Huế với nước lạnh, gạn lấy nước trong đổ vào nồi nước dùng.", "Làm mỡ màu bằng cách phi thơm tỏi băm, sả băm, ớt bột và dầu màu điều rồi trút vào nồi canh dùng.", "Nạm bò luộc chín thái lát. Nặn chả cua thành viên tròn nhỏ thả vào nồi nước dùng sôi nhẹ cho nổi lên.", "Xếp bún ra tô, xếp thịt nạm, giò heo, chả cua lên rồi chan ngập nước dùng, rắc rau răm ăn nóng."]'::jsonb, 'Chưng mắm ruốc thật kỹ với nước lạnh để lọc sạch cát sạn trước khi cho vào nồi ninh giúp nước dùng thơm tự nhiên không bị nồng.', '["Bún bò", "Huế", "Đầu bếp Hoàng", "Món nước"]', TRUE, FALSE, '2026-05-27T06:25:28.013162+00:00', '2026-05-27T06:25:28.013162+00:00');
INSERT INTO recipes (id, user_id, title, description, cover_image_url, meal_type, cook_time_minutes, servings, difficulty, ingredients, steps, notes, tags, is_public, is_favorite, created_at, updated_at) VALUES ('48f400c3-3289-46f5-97be-2c51388df012', '26de94ac-ef78-4850-a17e-53d205e2edc3', 'Cá Lóc Kho Tộ Ba Gian', 'Món ăn đưa cơm số 1 ngày đông. Những lát cá lóc tươi rói kho liu riu trong tộ đất sánh đặc kẹo sốt mặn ngọt cay nồng, rải đầy hành hoa và tóp mỡ giòn tan.', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=60', 'trua', 45, 3, 'trung_binh', '[{"name": "Cá lóc đồng thái lát dày", "quantity": "500g"}, {"name": "Tóp mỡ heo giòn ráo dầu", "quantity": "50g"}, {"name": "Nước mắm cốt nhĩ", "quantity": "4 thìa"}, {"name": "Đường phèn cát nhỏ, tiêu hạt đập dập", "quantity": "2 thìa"}, {"name": "Ớt hiểm nguyên quả, hành tỏi băm", "quantity": "1 ít"}]'::jsonb, '["Cá lóc ướp cùng hành tỏi băm, nước mắm, đường phèn, dầu màu dừa và hạt tiêu đập dập trong 30 phút.", "Lót vài nhánh sả và gừng thái lát dưới đáy tộ đất để chống cháy.", "Xếp từng lát cá vào tộ đất, rưới đều phần nước ướp cá lên.", "Đun tộ đất nhỏ lửa liu riu đến khi thịt cá săn lại thì lật mặt cá, thêm ớt hiểm đun tiếp.", "Khi nước kho sệt quánh kẹo lại bám đều quanh lát cá, rắc tóp mỡ hành hoa và tiêu lên là hoàn tất."]'::jsonb, 'Kho bằng tộ đất (nồi đất) giữ nhiệt tốt giúp cá ngấm gia vị sâu vào tận bên trong xương và thịt săn chắc cực kỳ ngon.', '["Cá kho", "Cơm nhà", "Mẹ Tôm", "Món mặn"]', TRUE, FALSE, '2026-05-27T06:25:28.013162+00:00', '2026-05-27T06:25:28.013162+00:00');
INSERT INTO recipes (id, user_id, title, description, cover_image_url, meal_type, cook_time_minutes, servings, difficulty, ingredients, steps, notes, tags, is_public, is_favorite, created_at, updated_at) VALUES ('3e82e675-b870-4db1-81b4-c49b49d4e515', '26de94ac-ef78-4850-a17e-53d205e2edc3', 'Chè Trôi Nước Ngọt Ngào', 'Món tráng miệng truyền thống với những viên chè nếp dẻo quánh bọc nhân đậu xanh bùi béo ngọt nhẹ, ngập trong nước đường gừng ấm nồng và mè rang thơm ngậy.', 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop&q=60', 'an_nhe', 50, 4, 'trung_binh', '[{"name": "Bột nếp mịn đặc biệt", "quantity": "300g"}, {"name": "Đậu xanh không vỏ đã luộc chín", "quantity": "150g"}, {"name": "Đường thốt nốt vàng", "quantity": "200g"}, {"name": "Gừng tươi thái chỉ", "quantity": "1 nhánh"}, {"name": "Nước cốt dừa, vừng rang", "quantity": "Vừa đủ"}]'::jsonb, '["Nhào bột nếp mịn với nước ấm cho đến khi dẻo mịn không dính tay, bọc kín ủ 20 phút.", "Xào đậu xanh luộc với đường và chút vani để làm nhân bùi ngọt, viên thành viên tròn nhỏ.", "Chia bột nếp, cán dẹt tròn mỏng rồi đặt nhân đậu xanh vào giữa vo tròn mịn kín kẽ.", "Thả viên chè vào nồi nước sôi luộc chín tới khi viên chè nổi hẳn lên mặt nước thì vớt ra thau nước lạnh.", "Đun sôi nước đường thốt nốt với gừng thái chỉ, thả các viên chè vào nấu nhỏ lửa 10 phút cho ngấm đường, múc ra bát rưới cốt dừa vừng rang."]'::jsonb, 'Để vỏ bánh mềm dẻo không bị cứng sau khi nguội, hãy nhào bột nếp bằng nước nóng ấm vừa phải.', '["Chè trôi nước", "Tráng miệng", "Truyền thống", "Mẹ Tôm"]', TRUE, FALSE, '2026-05-27T06:25:28.013162+00:00', '2026-05-27T06:25:28.013162+00:00');
INSERT INTO recipes (id, user_id, title, description, cover_image_url, meal_type, cook_time_minutes, servings, difficulty, ingredients, steps, notes, tags, is_public, is_favorite, created_at, updated_at) VALUES ('577b867e-21ce-4915-add5-9ffd933390ad', '9be6c8db-3eab-4283-b2e3-823f479aee28', 'Phở Bò Hà Nội', 'Món ăn quốc hồn quốc túy của Việt Nam với nước dùng bò ngọt thanh, thơm mùi hoa hồi, thảo quả và những lát thịt bò chín mềm mọng nước.', 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=60', 'sang', 180, 4, 'kho', '[{"name": "Bánh phở tươi", "quantity": "500g"}, {"name": "Xương ống bò", "quantity": "1kg"}, {"name": "Thịt gầu bò hoặc nạm", "quantity": "400g"}, {"name": "Hành tây, hành tím, gừng nướng", "quantity": "100g"}, {"name": "Hoa hồi, quế, thảo quả, hạt mùi", "quantity": "1 ít"}, {"name": "Hành lá, rau mùi, húng quế", "quantity": "1 ít"}]'::jsonb, '["Chần xương bò với nước sôi và muối để loại bỏ bọt bẩn, sau đó rửa sạch.", "Ninh xương bò trong 3-4 tiếng cùng hành tây, gừng nướng và túi gia vị hồi quế thảo quả đã rang thơm.", "Luộc chín gầu bò/nạm bò rồi vớt ra thái lát mỏng vừa ăn.", "Nêm nếm nước dùng với nước mắm ngon, muối, đường phèn cho ngọt thanh.", "Xếp bánh phở, thịt bò, hành lá vào tô rồi chan nước dùng sôi sùng sục lên và thưởng thức."]'::jsonb, 'Nên nướng gừng và hành tím trước khi cho vào nồi nước dùng để tạo mùi thơm đặc trưng của phở Hà Nội.', '["Phở", "Bò", "Truyền thống", "Món nước"]', TRUE, TRUE, '2026-05-27T06:23:47.202475+00:00', '2026-05-27T06:23:47.202475+00:00');
INSERT INTO recipes (id, user_id, title, description, cover_image_url, meal_type, cook_time_minutes, servings, difficulty, ingredients, steps, notes, tags, is_public, is_favorite, created_at, updated_at) VALUES ('f7941d0e-2baf-45ac-a405-3762ff8e5a96', '9be6c8db-3eab-4283-b2e3-823f479aee28', 'Canh Chua Cá Lóc Nam Bộ', 'Canh chua thanh mát, kết hợp hài hòa giữa vị chua của me, ngọt của cá lóc tươi sông, giòn sần sật của dọc mùng, giá đỗ và mùi thơm quyến rũ từ ngổ rừng.', 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=60', 'trua', 30, 4, 'dhe', '[{"name": "Cá lóc cắt khúc", "quantity": "400g"}, {"name": "Dọc mùng (bạc hà), đậu bắp", "quantity": "200g"}, {"name": "Cà chua, dứa (thơm)", "quantity": "1 quả"}, {"name": "Giá đỗ, nước cốt me", "quantity": "100g"}, {"name": "Rau ngổ (ngò ôm), ngò gai", "quantity": "1 ít"}]'::jsonb, '["Cá lóc làm sạch, xát muối để khử nhớt và mùi tanh.", "Dọc mùng tước vỏ, thái vát chéo, bóp muối rồi rửa sạch. Đậu bắp thái chéo.", "Đun sôi nước, lọc nước cốt me đổ vào. Cho dứa và cà chua vào nấu trước để ra nước ngọt chua.", "Cho cá lóc vào đun chín tới, vớt bọt liên tục để nước canh trong vắt.", "Cho tiếp dọc mùng, đậu bắp và giá đỗ vào nấu sôi lại. Tắt bếp, nêm nước mắm và rắc rau thơm ngổ, ngò gai."]'::jsonb, 'Không nên nấu dọc mùng quá lâu sẽ bị nhũn mất độ giòn ngon tự nhiên.', '["Canh chua", "Cá lóc", "Nam bộ", "Thanh mát"]', TRUE, FALSE, '2026-05-27T06:23:47.202475+00:00', '2026-05-27T06:23:47.202475+00:00');
INSERT INTO recipes (id, user_id, title, description, cover_image_url, meal_type, cook_time_minutes, servings, difficulty, ingredients, steps, notes, tags, is_public, is_favorite, created_at, updated_at) VALUES ('d5b5ebcd-5494-45de-9c5a-cccbb5fd1b12', 'e5efb2be-706c-4ac3-85e9-93e018d4bbe7', 'Bánh Xèo Miền Tây Giòn Rụm', 'Vỏ bánh xèo mỏng tang vàng rụm từ bột gạo và nước cốt dừa thơm phức, ôm trọn nhân tôm thịt sần sật, ăn kèm rau rừng chấm mắm chua ngọt cực kỳ phê!', 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=60', 'toi', 45, 4, 'trung_binh', '[{"name": "Bột bánh xèo nghệ", "quantity": "400g"}, {"name": "Tôm sông nhỏ", "quantity": "200g"}, {"name": "Thịt ba chỉ thái mỏng", "quantity": "200g"}, {"name": "Nước cốt dừa thơm", "quantity": "150ml"}, {"name": "Giá đỗ, hành lá", "quantity": "200g"}, {"name": "Rau thơm các loại, xà lách, cải bẹ xanh", "quantity": "Vừa đủ"}]'::jsonb, '["Pha bột bánh xèo với nước lọc, nước cốt dừa và hành lá cắt nhỏ, để bột nghỉ 15 phút.", "Xào săn tôm thịt trong chảo chống dính sâu lòng.", "Múc bột láng đều thật mỏng quanh lòng chảo, đậy vung 1 phút cho chín.", "Mở vung, rải giá đỗ lên trên, rưới chút dầu ăn quanh rìa bánh để bánh giòn rụm rồi gập đôi.", "Xếp ra đĩa ăn kèm rau rừng cải xanh chấm mắm chua ngọt tỏi ớt."]'::jsonb, 'Muốn bánh xèo giòn lâu, có thể pha thêm một chút bia hoặc nước soda lạnh vào hỗn hợp bột khi pha.', '["Bánh xèo", "Cô Ba", "Miền Tây", "Món chiên"]', TRUE, FALSE, '2026-05-27T06:25:28.013162+00:00', '2026-05-27T06:25:28.013162+00:00');
INSERT INTO recipes (id, user_id, title, description, cover_image_url, meal_type, cook_time_minutes, servings, difficulty, ingredients, steps, notes, tags, is_public, is_favorite, created_at, updated_at) VALUES ('808f6a59-4074-49e1-b5b0-9cb5408bebf9', '9be6c8db-3eab-4283-b2e3-823f479aee28', 'Sườn Xào Chua Ngọt', 'Món sườn heo chiên vàng ruộm, quyện trong sốt cà chua sóng sánh có vị chua dịu từ dấm, ngọt nhẹ từ đường phèn và thơm nồng từ hành tỏi băm.', 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&auto=format&fit=crop&q=60', 'toi', 40, 3, 'trung_binh', '[{"name": "Sườn non heo", "quantity": "500g"}, {"name": "Hành tây, ớt chuông thái miếng", "quantity": "1 củ"}, {"name": "Tương cà, tương ớt, dấm gạo", "quantity": "Vừa đủ"}, {"name": "Đường phèn băm nhỏ, nước mắm", "quantity": "2 thìa"}, {"name": "Hành tỏi băm", "quantity": "1 thìa"}]'::jsonb, '["Sườn chặt miếng vừa ăn, luộc sơ qua với chút muối rồi rửa sạch, để ráo.", "Chiên sườn ngập dầu cho đến khi bề mặt xém vàng nhẹ rồi vớt ra để ráo dầu.", "Pha sốt chua ngọt gồm: tương cà, tương ớt, dấm, đường, nước mắm và chút nước lọc.", "Phi thơm hành tỏi băm, cho sườn và nước sốt vào đảo đều, om nhỏ lửa trong 15 phút cho sườn ngấm sốt.", "Thêm hành tây, ớt chuông vào xào chín tới cho nước sốt sệt lại ôm sát miếng sườn."]'::jsonb, 'Chần sườn trước khi chiên giúp miếng sườn sạch, không bị ra nước đen và chiên sẽ giòn thơm hơn.', '["Sườn heo", "Chua ngọt", "Đưa cơm", "Yêu thích"]', TRUE, TRUE, '2026-05-27T06:23:47.202475+00:00', '2026-05-27T06:29:27.439+00:00');
INSERT INTO recipes (id, user_id, title, description, cover_image_url, meal_type, cook_time_minutes, servings, difficulty, ingredients, steps, notes, tags, is_public, is_favorite, created_at, updated_at) VALUES ('264021b0-c5c2-4ffc-b161-a55e9b50786d', '19404fbe-f489-472c-9580-0551431a3372', 'Cá Lóc Kho Tộ Ba Gian (đã lưu)', 'Món ăn đưa cơm số 1 ngày đông. Những lát cá lóc tươi rói kho liu riu trong tộ đất sánh đặc kẹo sốt mặn ngọt cay nồng, rải đầy hành hoa và tóp mỡ giòn tan.', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=60', 'trua', 45, 3, 'trung_binh', '[{"name": "Cá lóc đồng thái lát dày", "quantity": "500g"}, {"name": "Tóp mỡ heo giòn ráo dầu", "quantity": "50g"}, {"name": "Nước mắm cốt nhĩ", "quantity": "4 thìa"}, {"name": "Đường phèn cát nhỏ, tiêu hạt đập dập", "quantity": "2 thìa"}, {"name": "Ớt hiểm nguyên quả, hành tỏi băm", "quantity": "1 ít"}]'::jsonb, '["Cá lóc ướp cùng hành tỏi băm, nước mắm, đường phèn, dầu màu dừa và hạt tiêu đập dập trong 30 phút.", "Lót vài nhánh sả và gừng thái lát dưới đáy tộ đất để chống cháy.", "Xếp từng lát cá vào tộ đất, rưới đều phần nước ướp cá lên.", "Đun tộ đất nhỏ lửa liu riu đến khi thịt cá săn lại thì lật mặt cá, thêm ớt hiểm đun tiếp.", "Khi nước kho sệt quánh kẹo lại bám đều quanh lát cá, rắc tóp mỡ hành hoa và tiêu lên là hoàn tất."]'::jsonb, 'Kho bằng tộ đất (nồi đất) giữ nhiệt tốt giúp cá ngấm gia vị sâu vào tận bên trong xương và thịt săn chắc cực kỳ ngon.', '["Cá kho", "Cơm nhà", "Mẹ Tôm", "Món mặn"]', FALSE, FALSE, '2026-05-28T19:18:12.691989+00:00', '2026-05-28T19:18:12.691989+00:00');
INSERT INTO recipes (id, user_id, title, description, cover_image_url, meal_type, cook_time_minutes, servings, difficulty, ingredients, steps, notes, tags, is_public, is_favorite, created_at, updated_at) VALUES ('a539c368-f12e-4c65-ab11-9b4e2fb8074a', '19404fbe-f489-472c-9580-0551431a3372', 'Bún Bò Huế Sông Hương (đã lưu)', 'Bún bò Huế đậm đà chuẩn vị cố đô với nước dùng ngọt đậm đà từ xương bò quyện lẫn mùi mắm ruốc chưng thơm phức, sợi bún to ăn kèm giò heo béo ngậy.', 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=800&auto=format&fit=crop&q=60', 'sang', 120, 5, 'kho', '[{"name": "Sợi bún bò to", "quantity": "1kg"}, {"name": "Xương ống và giò heo", "quantity": "1.2kg"}, {"name": "Nạm bò, chả cua Huế", "quantity": "500g"}, {"name": "Mắm ruốc Huế thơm", "quantity": "3 thìa"}, {"name": "Sả tươi, ớt bột băm, hạt điều màu", "quantity": "1 ít"}, {"name": "Rau răm, hoa chuối bào, giá đỗ", "quantity": "1 ít"}]'::jsonb, '["Chần sạch xương ống và chân giò heo, đem ninh nhỏ lửa liên tục trong 2 tiếng cùng sả cây đập dập.", "Hòa mắm ruốc Huế với nước lạnh, gạn lấy nước trong đổ vào nồi nước dùng.", "Làm mỡ màu bằng cách phi thơm tỏi băm, sả băm, ớt bột và dầu màu điều rồi trút vào nồi canh dùng.", "Nạm bò luộc chín thái lát. Nặn chả cua thành viên tròn nhỏ thả vào nồi nước dùng sôi nhẹ cho nổi lên.", "Xếp bún ra tô, xếp thịt nạm, giò heo, chả cua lên rồi chan ngập nước dùng, rắc rau răm ăn nóng."]'::jsonb, 'Chưng mắm ruốc thật kỹ với nước lạnh để lọc sạch cát sạn trước khi cho vào nồi ninh giúp nước dùng thơm tự nhiên không bị nồng.', '["Bún bò", "Huế", "Đầu bếp Hoàng", "Món nước"]', FALSE, FALSE, '2026-05-28T19:58:53.046461+00:00', '2026-05-28T19:58:53.046461+00:00');
INSERT INTO recipes (id, user_id, title, description, cover_image_url, meal_type, cook_time_minutes, servings, difficulty, ingredients, steps, notes, tags, is_public, is_favorite, created_at, updated_at) VALUES ('7618e92e-44e7-4103-b14a-b7a4a1736e31', '19404fbe-f489-472c-9580-0551431a3372', 'Trứng chiên', 'Trứng chiên lòng đào chấm kèm với bánh mỳ', NULL, 'sang', 30, 1, 'de', '[{"name": "Trứng", "category": "thit_ca_trung", "quantity": "2 quả"}, {"name": "Bánh mỳ", "category": "ngu_coc", "quantity": "2 bánh"}]'::jsonb, '["Bắt chảo lên bếp cho nóng", "Khi chảo đã nóng thì đập trứng vào", "Trứng chín thì không lật lại, chỉ đậy nắp lại trong 30 giây"]'::jsonb, NULL, '["giảm cân", "nhanh gọn"]', TRUE, TRUE, '2026-05-28T20:12:46.661555+00:00', '2026-05-28T20:12:46.661555+00:00');
INSERT INTO recipes (id, user_id, title, description, cover_image_url, meal_type, cook_time_minutes, servings, difficulty, ingredients, steps, notes, tags, is_public, is_favorite, created_at, updated_at) VALUES ('6c015022-21f2-4e62-9970-a8769f7e2710', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Cá Lóc Kho Tộ Ba Gian (đã lưu)', 'Món ăn đưa cơm số 1 ngày đông. Những lát cá lóc tươi rói kho liu riu trong tộ đất sánh đặc kẹo sốt mặn ngọt cay nồng, rải đầy hành hoa và tóp mỡ giòn tan.', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=60', 'trua', 45, 3, 'trung_binh', '[{"name": "Cá lóc đồng thái lát dày", "quantity": "500g"}, {"name": "Tóp mỡ heo giòn ráo dầu", "quantity": "50g"}, {"name": "Nước mắm cốt nhĩ", "quantity": "4 thìa"}, {"name": "Đường phèn cát nhỏ, tiêu hạt đập dập", "quantity": "2 thìa"}, {"name": "Ớt hiểm nguyên quả, hành tỏi băm", "quantity": "1 ít"}]'::jsonb, '["Cá lóc ướp cùng hành tỏi băm, nước mắm, đường phèn, dầu màu dừa và hạt tiêu đập dập trong 30 phút.", "Lót vài nhánh sả và gừng thái lát dưới đáy tộ đất để chống cháy.", "Xếp từng lát cá vào tộ đất, rưới đều phần nước ướp cá lên.", "Đun tộ đất nhỏ lửa liu riu đến khi thịt cá săn lại thì lật mặt cá, thêm ớt hiểm đun tiếp.", "Khi nước kho sệt quánh kẹo lại bám đều quanh lát cá, rắc tóp mỡ hành hoa và tiêu lên là hoàn tất."]'::jsonb, 'Kho bằng tộ đất (nồi đất) giữ nhiệt tốt giúp cá ngấm gia vị sâu vào tận bên trong xương và thịt săn chắc cực kỳ ngon.', '["Cá kho", "Cơm nhà", "Mẹ Tôm", "Món mặn"]', FALSE, FALSE, '2026-05-29T08:46:15.76135+00:00', '2026-05-29T08:46:15.76135+00:00');
INSERT INTO recipes (id, user_id, title, description, cover_image_url, meal_type, cook_time_minutes, servings, difficulty, ingredients, steps, notes, tags, is_public, is_favorite, created_at, updated_at) VALUES ('b282b668-e00e-4790-bf57-3c82503f0ca4', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Sườn Xào Chua Ngọt (đã lưu)', 'Món sườn heo chiên vàng ruộm, quyện trong sốt cà chua sóng sánh có vị chua dịu từ dấm, ngọt nhẹ từ đường phèn và thơm nồng từ hành tỏi băm.', 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&auto=format&fit=crop&q=60', 'toi', 40, 3, 'trung_binh', '[{"name": "Sườn non heo", "quantity": "500g"}, {"name": "Hành tây, ớt chuông thái miếng", "quantity": "1 củ"}, {"name": "Tương cà, tương ớt, dấm gạo", "quantity": "Vừa đủ"}, {"name": "Đường phèn băm nhỏ, nước mắm", "quantity": "2 thìa"}, {"name": "Hành tỏi băm", "quantity": "1 thìa"}]'::jsonb, '["Sườn chặt miếng vừa ăn, luộc sơ qua với chút muối rồi rửa sạch, để ráo.", "Chiên sườn ngập dầu cho đến khi bề mặt xém vàng nhẹ rồi vớt ra để ráo dầu.", "Pha sốt chua ngọt gồm: tương cà, tương ớt, dấm, đường, nước mắm và chút nước lọc.", "Phi thơm hành tỏi băm, cho sườn và nước sốt vào đảo đều, om nhỏ lửa trong 15 phút cho sườn ngấm sốt.", "Thêm hành tây, ớt chuông vào xào chín tới cho nước sốt sệt lại ôm sát miếng sườn."]'::jsonb, 'Chần sườn trước khi chiên giúp miếng sườn sạch, không bị ra nước đen và chiên sẽ giòn thơm hơn.', '["Sườn heo", "Chua ngọt", "Đưa cơm", "Yêu thích"]', FALSE, FALSE, '2026-05-29T09:33:51.91628+00:00', '2026-05-29T09:33:51.91628+00:00');
INSERT INTO recipes (id, user_id, title, description, cover_image_url, meal_type, cook_time_minutes, servings, difficulty, ingredients, steps, notes, tags, is_public, is_favorite, created_at, updated_at) VALUES ('6fa629d0-ecea-458c-9266-1db5cc5b249f', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Trứng chiên (đã lưu)', 'Trứng chiên lòng đào chấm kèm với bánh mỳ', 'https://muddvyvwaievadkcciso.supabase.co/storage/v1/object/public/recipe-covers/4ef5e41a-595e-4c73-bfe0-00147518b08a/1780046280571.webp', 'sang', 30, 1, 'de', '[{"name": "Trứng", "category": "thit_ca_trung", "quantity": "2 quả"}, {"name": "Bánh mỳ", "category": "ngu_coc", "quantity": "2 bánh"}]'::jsonb, '["Bắt chảo lên bếp cho nóng", "Khi chảo đã nóng thì đập trứng vào", "Trứng chín thì không lật lại, chỉ đậy nắp lại trong 30 giây"]'::jsonb, NULL, '["giảm cân", "nhanh gọn"]', FALSE, TRUE, '2026-05-29T06:33:53.297658+00:00', '2026-05-29T09:26:00.889+00:00');
INSERT INTO recipes (id, user_id, title, description, cover_image_url, meal_type, cook_time_minutes, servings, difficulty, ingredients, steps, notes, tags, is_public, is_favorite, created_at, updated_at) VALUES ('4bc3fdf3-1587-4baa-b2cc-47a27fc1c2d7', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Phở Bò Hà Nội (đã lưu)', 'Món ăn quốc hồn quốc túy của Việt Nam với nước dùng bò ngọt thanh, thơm mùi hoa hồi, thảo quả và những lát thịt bò chín mềm mọng nước.', 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=60', 'sang', 180, 4, 'kho', '[{"name": "Bánh phở tươi", "quantity": "500g"}, {"name": "Xương ống bò", "quantity": "1kg"}, {"name": "Thịt gầu bò hoặc nạm", "quantity": "400g"}, {"name": "Hành tây, hành tím, gừng nướng", "quantity": "100g"}, {"name": "Hoa hồi, quế, thảo quả, hạt mùi", "quantity": "1 ít"}, {"name": "Hành lá, rau mùi, húng quế", "quantity": "1 ít"}]'::jsonb, '["Chần xương bò với nước sôi và muối để loại bỏ bọt bẩn, sau đó rửa sạch.", "Ninh xương bò trong 3-4 tiếng cùng hành tây, gừng nướng và túi gia vị hồi quế thảo quả đã rang thơm.", "Luộc chín gầu bò/nạm bò rồi vớt ra thái lát mỏng vừa ăn.", "Nêm nếm nước dùng với nước mắm ngon, muối, đường phèn cho ngọt thanh.", "Xếp bánh phở, thịt bò, hành lá vào tô rồi chan nước dùng sôi sùng sục lên và thưởng thức."]'::jsonb, 'Nên nướng gừng và hành tím trước khi cho vào nồi nước dùng để tạo mùi thơm đặc trưng của phở Hà Nội.', '["Phở", "Bò", "Truyền thống", "Món nước"]', FALSE, FALSE, '2026-05-29T09:31:15.356714+00:00', '2026-05-29T09:31:15.356714+00:00');


-- ----- Dữ liệu mẫu cho bảng `meal_plan_items` -----
TRUNCATE TABLE meal_plan_items CASCADE; -- Dọn dẹp dữ liệu cũ tránh xung đột khóa ngoại

INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('0f6117fe-adad-49fc-9756-a615ef2e3e62', '9be6c8db-3eab-4283-b2e3-823f479aee28', '577b867e-21ce-4915-add5-9ffd933390ad', '2026-05-27', 3, 'sang', 'Bữa sáng đầy dinh dưỡng cho cả gia đình', '2026-05-27T06:23:47.304421+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('c816811a-5d4b-48b7-8026-a8e8c8fec3a3', '9be6c8db-3eab-4283-b2e3-823f479aee28', '64b36f2f-f4d3-485b-bd92-f32eda0c78f6', '2026-05-27', 3, 'trua', 'Cơm trưa ấm cúng', '2026-05-27T06:23:47.304421+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('812fb62a-efb2-49cd-b642-cb2a91ebe92a', '9be6c8db-3eab-4283-b2e3-823f479aee28', '808f6a59-4074-49e1-b5b0-9cb5408bebf9', '2026-05-27', 3, 'toi', 'Bữa tối thơm ngon đưa cơm', '2026-05-27T06:23:47.304421+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('dd6a8094-fb63-423d-95ba-71f34a09e21a', '9be6c8db-3eab-4283-b2e3-823f479aee28', 'f7941d0e-2baf-45ac-a405-3762ff8e5a96', '2026-05-28', 4, 'trua', 'Canh chua thanh nhiệt ngày nắng nóng', '2026-05-27T06:23:47.304421+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('cd6cd9cc-1b66-4af3-9b28-30ccab3e8629', '19404fbe-f489-472c-9580-0551431a3372', '264021b0-c5c2-4ffc-b161-a55e9b50786d', '2026-05-28', 5, 'sang', NULL, '2026-05-28T19:53:44.110724+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('fb27cb84-16d5-465c-ac0f-a3c2402558a8', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '6fa629d0-ecea-458c-9266-1db5cc5b249f', '2026-05-29', 6, 'sang', NULL, '2026-05-29T06:34:32.991876+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('ffb17d31-4645-492d-a15c-56db98bf471e', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '6c015022-21f2-4e62-9970-a8769f7e2710', '2026-05-29', 6, 'trua', NULL, '2026-05-29T09:30:49.147451+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('3497997d-ec2b-4c55-b64c-b688a0188e92', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '4bc3fdf3-1587-4baa-b2cc-47a27fc1c2d7', '2026-05-29', 6, 'toi', NULL, '2026-05-29T09:31:21.617129+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('eae650bc-7c47-49cc-8c00-7e2cdf53dc71', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '6fa629d0-ecea-458c-9266-1db5cc5b249f', '2026-05-29', 6, 'an_nhe', NULL, '2026-05-29T09:31:25.656562+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('f822e3cd-5c86-4441-9aa0-bd1cc46bd7d3', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '4bc3fdf3-1587-4baa-b2cc-47a27fc1c2d7', '2026-05-24', 1, 'sang', NULL, '2026-05-29T09:33:27.408713+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('c861b6cf-c9f1-4353-a576-8168bfb0b82f', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '6c015022-21f2-4e62-9970-a8769f7e2710', '2026-05-24', 1, 'trua', NULL, '2026-05-29T09:33:29.359266+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('dc097fb5-9d52-4048-9c51-74129a2026dd', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '6fa629d0-ecea-458c-9266-1db5cc5b249f', '2026-05-24', 1, 'toi', NULL, '2026-05-29T09:33:30.806317+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('6c34c864-8bba-4f2c-b1ba-442b4edc2e16', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '4bc3fdf3-1587-4baa-b2cc-47a27fc1c2d7', '2026-05-24', 1, 'an_nhe', NULL, '2026-05-29T09:33:32.514622+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('d28ff3b1-9e75-40f5-9f5b-2e6d0bf5b7c0', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '4bc3fdf3-1587-4baa-b2cc-47a27fc1c2d7', '2026-05-26', 3, 'sang', NULL, '2026-05-29T09:33:33.957808+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('f905c687-fa32-46b7-8e63-03d43dffca86', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '6c015022-21f2-4e62-9970-a8769f7e2710', '2026-05-25', 2, 'sang', NULL, '2026-05-29T09:33:35.726887+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('7636706a-6fb8-442e-8ba7-0f995b307c3c', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '6fa629d0-ecea-458c-9266-1db5cc5b249f', '2026-05-25', 2, 'trua', NULL, '2026-05-29T09:33:39.768777+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('fed83d33-5f19-4779-bb56-f384d0484886', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '6c015022-21f2-4e62-9970-a8769f7e2710', '2026-05-25', 2, 'toi', NULL, '2026-05-29T09:33:41.373285+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('a47ba4a9-bea3-4b53-b348-9bb5863095ca', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '6fa629d0-ecea-458c-9266-1db5cc5b249f', '2026-05-25', 2, 'an_nhe', NULL, '2026-05-29T09:33:43.227983+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('7a0a67c6-7cba-4a1d-badf-a5a2d307b217', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '4bc3fdf3-1587-4baa-b2cc-47a27fc1c2d7', '2026-05-26', 3, 'trua', NULL, '2026-05-29T09:33:44.921555+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('4b2d912b-13b9-420f-a657-cc0c38e5319f', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '6c015022-21f2-4e62-9970-a8769f7e2710', '2026-05-26', 3, 'toi', NULL, '2026-05-29T09:33:46.599849+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('132b21be-138a-4442-bfd6-835bd8a82089', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'b282b668-e00e-4790-bf57-3c82503f0ca4', '2026-05-26', 3, 'an_nhe', NULL, '2026-05-29T09:33:59.729914+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('8a77f2af-24d2-4139-978a-a3f12d9cd04c', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'b282b668-e00e-4790-bf57-3c82503f0ca4', '2026-05-27', 4, 'toi', NULL, '2026-05-29T09:34:01.396787+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('4e54aecf-45ed-4ba9-80ab-d82825b7db02', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '4bc3fdf3-1587-4baa-b2cc-47a27fc1c2d7', '2026-05-27', 4, 'trua', NULL, '2026-05-29T09:34:03.305406+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('b918fbe9-4e04-419b-aea0-23b897aedbde', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '6fa629d0-ecea-458c-9266-1db5cc5b249f', '2026-05-27', 4, 'sang', NULL, '2026-05-29T09:34:04.652261+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('15557a47-325c-41eb-8b97-3934bccc20fc', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '6fa629d0-ecea-458c-9266-1db5cc5b249f', '2026-05-28', 5, 'sang', NULL, '2026-05-29T09:34:06.005785+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('961373fe-6fe2-4df4-aa6d-8463b86c17c0', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '6fa629d0-ecea-458c-9266-1db5cc5b249f', '2026-05-30', 7, 'sang', NULL, '2026-05-29T09:34:07.42204+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('19e56b7a-073c-42c0-b65a-1e8396a518fa', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '6c015022-21f2-4e62-9970-a8769f7e2710', '2026-05-27', 4, 'an_nhe', NULL, '2026-05-29T09:34:09.830397+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('f3731dfd-aa88-45b5-a0fb-50ff3bde578b', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '4bc3fdf3-1587-4baa-b2cc-47a27fc1c2d7', '2026-05-28', 5, 'trua', NULL, '2026-05-29T09:34:11.667136+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('d193e9d0-0dc8-4db0-8e52-45f1a951ddc0', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '6c015022-21f2-4e62-9970-a8769f7e2710', '2026-05-28', 5, 'toi', NULL, '2026-05-29T09:34:12.636281+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('73846b69-d1f5-43d4-af0f-d3a9e5a32342', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '6fa629d0-ecea-458c-9266-1db5cc5b249f', '2026-05-28', 5, 'an_nhe', NULL, '2026-05-29T09:34:13.676037+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('5db48071-0c06-45d1-9447-6c43ea5ee89d', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '4bc3fdf3-1587-4baa-b2cc-47a27fc1c2d7', '2026-05-30', 7, 'trua', NULL, '2026-05-29T09:34:15.371463+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('9aff2613-2e8a-46ff-9317-bd43d1e7948b', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'b282b668-e00e-4790-bf57-3c82503f0ca4', '2026-05-30', 7, 'toi', NULL, '2026-05-29T09:34:16.169912+00:00');
INSERT INTO meal_plan_items (id, user_id, recipe_id, plan_date, day_of_week, meal_slot, note, created_at) VALUES ('e930216b-f133-46f1-971a-91698f7682a6', '4ef5e41a-595e-4c73-bfe0-00147518b08a', '6c015022-21f2-4e62-9970-a8769f7e2710', '2026-05-30', 7, 'an_nhe', NULL, '2026-05-29T09:34:17.166811+00:00');


-- ----- Dữ liệu mẫu cho bảng `grocery_lists` -----
TRUNCATE TABLE grocery_lists CASCADE; -- Dọn dẹp dữ liệu cũ tránh xung đột khóa ngoại

INSERT INTO grocery_lists (id, user_id, title, week_start, created_at) VALUES ('6fb3f466-f063-4291-82c3-e89f7c9fb651', '9be6c8db-3eab-4283-b2e3-823f479aee28', 'Đi chợ chuẩn bị nấu Phở Bò & Thịt Kho', '2026-05-27', '2026-05-27T06:23:47.462659+00:00');
INSERT INTO grocery_lists (id, user_id, title, week_start, created_at) VALUES ('2a28a0d8-fdf2-4a97-8e10-4f6e2e9486cd', '19404fbe-f489-472c-9580-0551431a3372', 'Danh sách đi chợ của tôi', NULL, '2026-05-28T18:58:06.830475+00:00');
INSERT INTO grocery_lists (id, user_id, title, week_start, created_at) VALUES ('7513daed-22a4-4a5e-a24f-70d775b1c7b6', '19404fbe-f489-472c-9580-0551431a3372', 'Đi chợ tuần 2026-05-24', '2026-05-24', '2026-05-28T19:51:33.893482+00:00');
INSERT INTO grocery_lists (id, user_id, title, week_start, created_at) VALUES ('7241b04d-d7ff-4087-8716-cecd47d464e7', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Danh sách đi chợ của tôi', NULL, '2026-05-29T06:32:21.179111+00:00');
INSERT INTO grocery_lists (id, user_id, title, week_start, created_at) VALUES ('60bfe8ca-b6d3-4997-952b-1e6e4f51e836', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Đi chợ tuần 2026-05-24', '2026-05-24', '2026-05-29T09:31:35.749328+00:00');


-- ----- Dữ liệu mẫu cho bảng `grocery_items` -----
TRUNCATE TABLE grocery_items CASCADE; -- Dọn dẹp dữ liệu cũ tránh xung đột khóa ngoại

INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('03ee0ed4-0cdc-4a70-adeb-a009fb702042', '6fb3f466-f063-4291-82c3-e89f7c9fb651', '9be6c8db-3eab-4283-b2e3-823f479aee28', 'Bánh phở tươi', '500g', 'Tinh bột', FALSE, '2026-05-27T06:23:47.517971+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('999d87fd-cd8d-4f6f-a056-827397c5cce1', '6fb3f466-f063-4291-82c3-e89f7c9fb651', '9be6c8db-3eab-4283-b2e3-823f479aee28', 'Thịt gầu bò bò', '400g', 'Thịt & Cá', FALSE, '2026-05-27T06:23:47.517971+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('8fe090ab-808d-4593-a086-91bf9bf32331', '6fb3f466-f063-4291-82c3-e89f7c9fb651', '9be6c8db-3eab-4283-b2e3-823f479aee28', 'Xương ống bò', '1kg', 'Thịt & Cá', FALSE, '2026-05-27T06:23:47.517971+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('307c8518-115e-40e3-ab32-f6b4d3cd8ba9', '6fb3f466-f063-4291-82c3-e89f7c9fb651', '9be6c8db-3eab-4283-b2e3-823f479aee28', 'Thịt ba chỉ heo', '500g', 'Thịt & Cá', TRUE, '2026-05-27T06:23:47.517971+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('216f5f7c-c0b2-4eb3-9590-41156e13eed8', '6fb3f466-f063-4291-82c3-e89f7c9fb651', '9be6c8db-3eab-4283-b2e3-823f479aee28', 'Trứng cút', '1 vỉ', 'Trứng & Sữa', FALSE, '2026-05-27T06:23:47.517971+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('2de7a5bd-a5f5-4bc3-b14e-aed17f4414fc', '6fb3f466-f063-4291-82c3-e89f7c9fb651', '9be6c8db-3eab-4283-b2e3-823f479aee28', 'Hành tây & Gừng', '200g', 'Rau củ', FALSE, '2026-05-27T06:23:47.517971+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('3426721b-ccbf-4edf-9481-c18c0201dfd5', '6fb3f466-f063-4291-82c3-e89f7c9fb651', '9be6c8db-3eab-4283-b2e3-823f479aee28', 'Nước dừa tươi', '1 quả', 'Khác', FALSE, '2026-05-27T06:23:47.517971+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('1b9c7616-5489-425a-9964-6e4a43736193', '7513daed-22a4-4a5e-a24f-70d775b1c7b6', '19404fbe-f489-472c-9580-0551431a3372', 'cà chua', '2', 'rau_cu', FALSE, '2026-05-28T20:05:14.914807+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('1b5e9a1d-e1d4-4377-8f2c-3f5f5a780835', '7513daed-22a4-4a5e-a24f-70d775b1c7b6', '19404fbe-f489-472c-9580-0551431a3372', 'đậu khuôn', NULL, 'khac', FALSE, '2026-05-28T20:06:01.899364+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('8b8aee8f-312c-4317-b0a1-2025e36ba544', '7513daed-22a4-4a5e-a24f-70d775b1c7b6', '19404fbe-f489-472c-9580-0551431a3372', 'thịt', '1', 'thit_ca_trung', TRUE, '2026-05-28T20:05:40.286773+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('7fb5b044-8aee-4b40-bff3-1f3a271e472f', '60bfe8ca-b6d3-4997-952b-1e6e4f51e836', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Bánh phở tươi', '500g + 500g + 500g + 500g + 500g + 500g + 500g + 500g', 'ngu_coc', FALSE, '2026-05-29T11:05:17.75936+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('04b4be23-4d0a-4aba-8326-477d0b5ec7e9', '60bfe8ca-b6d3-4997-952b-1e6e4f51e836', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Xương ống bò', '1kg + 1kg + 1kg + 1kg + 1kg + 1kg + 1kg + 1kg', 'thit_ca_trung', FALSE, '2026-05-29T11:05:17.75936+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('e89fdd90-7bd7-43d7-af69-637349960691', '60bfe8ca-b6d3-4997-952b-1e6e4f51e836', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Thịt gầu bò hoặc nạm', '400g + 400g + 400g + 400g + 400g + 400g + 400g + 400g', 'thit_ca_trung', FALSE, '2026-05-29T11:05:17.75936+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('d68152b5-04da-44cc-a958-245a4efa5578', '60bfe8ca-b6d3-4997-952b-1e6e4f51e836', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Hành tây, hành tím, gừng nướng', '100g + 100g + 100g + 100g + 100g + 100g + 100g + 100g', 'rau_cu', FALSE, '2026-05-29T11:05:17.75936+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('1f41c9c8-5d66-4590-b133-f6b86f92ad4a', '60bfe8ca-b6d3-4997-952b-1e6e4f51e836', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Hoa hồi, quế, thảo quả, hạt mùi', '1 ít + 1 ít + 1 ít + 1 ít + 1 ít + 1 ít + 1 ít + 1 ít', 'ngu_coc', FALSE, '2026-05-29T11:05:17.75936+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('de1df614-bc7d-48b2-bc72-8f7c31ae23c4', '60bfe8ca-b6d3-4997-952b-1e6e4f51e836', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Hành lá, rau mùi, húng quế', '1 ít + 1 ít + 1 ít + 1 ít + 1 ít + 1 ít + 1 ít + 1 ít', 'rau_cu', FALSE, '2026-05-29T11:05:17.75936+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('4c23a57c-e572-465d-906b-e63949a7c3ae', '60bfe8ca-b6d3-4997-952b-1e6e4f51e836', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Cá lóc đồng thái lát dày', '500g + 500g + 500g + 500g + 500g + 500g + 500g + 500g', 'thit_ca_trung', FALSE, '2026-05-29T11:05:17.75936+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('fc965ecb-d3be-45aa-b20e-b30c3676050b', '60bfe8ca-b6d3-4997-952b-1e6e4f51e836', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Tóp mỡ heo giòn ráo dầu', '50g + 50g + 50g + 50g + 50g + 50g + 50g + 50g', 'thit_ca_trung', FALSE, '2026-05-29T11:05:17.75936+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('5e9665f1-3bee-4ecf-8a77-dfa0c5333dfa', '60bfe8ca-b6d3-4997-952b-1e6e4f51e836', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Nước mắm cốt nhĩ', '4 thìa + 4 thìa + 4 thìa + 4 thìa + 4 thìa + 4 thìa + 4 thìa + 4 thìa', 'gia_vi', FALSE, '2026-05-29T11:05:17.75936+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('e3d2cf7c-4f13-4881-9af0-60e7039d6e40', '60bfe8ca-b6d3-4997-952b-1e6e4f51e836', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Đường phèn cát nhỏ, tiêu hạt đập dập', '2 thìa + 2 thìa + 2 thìa + 2 thìa + 2 thìa + 2 thìa + 2 thìa + 2 thìa', 'thit_ca_trung', FALSE, '2026-05-29T11:05:17.75936+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('2fc107b7-bf4b-4291-88ad-77d3ce847eb5', '60bfe8ca-b6d3-4997-952b-1e6e4f51e836', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Ớt hiểm nguyên quả, hành tỏi băm', '1 ít + 1 ít + 1 ít + 1 ít + 1 ít + 1 ít + 1 ít + 1 ít', 'rau_cu', FALSE, '2026-05-29T11:05:17.75936+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('8b3676e4-a077-4a5c-999e-8e80e2ad4753', '60bfe8ca-b6d3-4997-952b-1e6e4f51e836', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Trứng', '2 quả + 2 quả + 2 quả + 2 quả + 2 quả + 2 quả + 2 quả + 2 quả + 2 quả', 'thit_ca_trung', FALSE, '2026-05-29T11:05:17.75936+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('b64234f8-e663-4c52-b503-de6f164cdff9', '60bfe8ca-b6d3-4997-952b-1e6e4f51e836', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Bánh mỳ', '2 bánh + 2 bánh + 2 bánh + 2 bánh + 2 bánh + 2 bánh + 2 bánh + 2 bánh + 2 bánh', 'ngu_coc', FALSE, '2026-05-29T11:05:17.75936+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('70246e5b-380d-4ada-b466-e358f1b6cc2a', '60bfe8ca-b6d3-4997-952b-1e6e4f51e836', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Sườn non heo', '500g + 500g + 500g', 'thit_ca_trung', FALSE, '2026-05-29T11:05:17.75936+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('6d2cc591-9d9e-402f-9476-08517b78a880', '60bfe8ca-b6d3-4997-952b-1e6e4f51e836', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Hành tây, ớt chuông thái miếng', '1 củ + 1 củ + 1 củ', 'rau_cu', FALSE, '2026-05-29T11:05:17.75936+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('43dd57e1-2df4-4dca-83bc-860506e9d2d4', '60bfe8ca-b6d3-4997-952b-1e6e4f51e836', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Tương cà, tương ớt, dấm gạo', 'Vừa đủ + Vừa đủ + Vừa đủ', 'rau_cu', FALSE, '2026-05-29T11:05:17.75936+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('4e283630-1ce0-4a85-88d9-6a0e10b24070', '60bfe8ca-b6d3-4997-952b-1e6e4f51e836', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Đường phèn băm nhỏ, nước mắm', '2 thìa + 2 thìa + 2 thìa', 'gia_vi', FALSE, '2026-05-29T11:05:17.75936+00:00');
INSERT INTO grocery_items (id, list_id, user_id, name, quantity, category, is_checked, created_at) VALUES ('71531a79-2e68-41fe-a5f9-b7aed6efda36', '60bfe8ca-b6d3-4997-952b-1e6e4f51e836', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'Hành tỏi băm', '1 thìa + 1 thìa + 1 thìa', 'rau_cu', FALSE, '2026-05-29T11:05:17.75936+00:00');


-- ----- Dữ liệu mẫu cho bảng `ai_prompt_logs` -----
TRUNCATE TABLE ai_prompt_logs CASCADE; -- Dọn dẹp dữ liệu cũ tránh xung đột khóa ngoại

INSERT INTO ai_prompt_logs (id, user_id, feature, prompt, response, created_at) VALUES ('f8888ef8-0ee3-462b-9b97-9fd186327f69', '9be6c8db-3eab-4283-b2e3-823f479aee28', 'summarize_recipe', 'Hãy tóm tắt công thức nấu ăn sau thành 5-7 bước ngắn gọn, dễ nhớ.
Mỗi bước chỉ 1-2 câu, dùng động từ rõ ràng ở đầu câu.
Trả lời bằng tiếng Việt, dạng danh sách đánh số.

Công thức:
Tên món: Sườn Xào Chua Ngọt
Mô tả: Món sườn heo chiên vàng ruộm, quyện trong sốt cà chua sóng sánh có vị chua dịu từ dấm, ngọt nhẹ từ đường phèn và thơm nồng từ hành tỏi băm.
Khẩu phần: 3
Thời gian: 40 phút
Nguyên liệu:
- Sườn non heo (500g)
- Hành tây, ớt chuông thái miếng (1 củ)
- Tương cà, tương ớt, dấm gạo (Vừa đủ)
- Đường phèn băm nhỏ, nước mắm (2 thìa)
- Hành tỏi băm (1 thìa)
Các bước:
1. Sườn chặt miếng vừa ăn, luộc sơ qua với chút muối rồi rửa sạch, để ráo.
2. Chiên sườn ngập dầu cho đến khi bề mặt xém vàng nhẹ rồi vớt ra để ráo dầu.
3. Pha sốt chua ngọt gồm: tương cà, tương ớt, dấm, đường, nước mắm và chút nước lọc.
4. Phi thơm hành tỏi băm, cho sườn và nước sốt vào đảo đều, om nhỏ lửa trong 15 phút cho sườn ngấm sốt.
5. Thêm hành tây, ớt chuông vào xào chín tới cho nước sốt sệt lại ôm sát miếng sườn.
Ghi chú: Chần sườn trước khi chiên giúp miếng sườn sạch, không bị ra nước đen và chiên sẽ giòn thơm hơn.', '1. Chặt sườn miếng vừa ăn, luộc sơ với muối rồi rửa sạch, để ráo.
2. Chiên sườn ngập dầu đến khi vàng nhẹ, vớt ra để ráo dầu.
3. Pha sốt chua ngọt từ tương cà, tương ớt, dấm, đường, nước mắm và ít nước lọc.
4. Phi thơm hành tỏi, cho sườn và sốt vào đảo đều, om lửa nhỏ 15 phút.
5. Thêm hành tây, ớt chuông vào xào chín tới, đảo đến khi sốt sệt lại quanh sườn.', '2026-05-27T06:28:44.544483+00:00');
INSERT INTO ai_prompt_logs (id, user_id, feature, prompt, response, created_at) VALUES ('27506314-636d-487f-8b40-a8750bfc2cce', '19404fbe-f489-472c-9580-0551431a3372', 'generate_meal_plan', 'Hãy tạo thực đơn 7 ngày (từ Thứ 2 đến Chủ nhật) phục vụ mục tiêu: "giảm cân".
Mỗi ngày bao gồm 3 bữa: sáng (sang), trưa (trua), tối (toi).
Mỗi món là món Việt Nam phổ biến, dễ nấu.

Trả lời CHÍNH XÁC dưới dạng JSON (không có chú thích, không markdown), theo schema:
{
  "plan": [
    { "day_of_week": 1, "day_label": "Thứ 2", "meals": { "sang": "Tên món", "trua": "Tên món", "toi": "Tên món" } },
    ...
  ]
}
day_of_week từ 1 (Thứ 2) đến 7 (Chủ nhật).', '{
  "plan": [
    {
      "day_of_week": 1,
      "day_label": "Thứ 2",
      "meals": {
        "sang": "Bánh cuốn chả lợn",
        "trua": "Cơm gạo lứt ức gà luộc, rau luộc, canh bí đỏ tôm",
        "toi": "Gỏi gà bắp cải"
      }
    },
    {
      "day_of_week": 2,
      "day_label": "Thứ 3",
      "meals": {
        "sang": "Phở gà",
        "trua": "Cơm cá hấp, rau củ luộc, canh rau ngót",
        "toi": "Cháo cá lóc"
      }
    },
    {
      "day_of_week": 3,
      "day_label": "Thứ 4",
      "meals": {
        "sang": "Bún chả cá",
        "trua": "Cơm tấm sườn nướng (ít mỡ), dưa leo, canh khổ qua",
        "toi": "Salad tôm thịt luộc"
      }
    },
    {
      "day_of_week": 4,
      "day_label": "Thứ 5",
      "meals": {
        "sang": "Cháo yến mạch thịt bằm",
        "trua": "Miến gà (ít dầu), rau sống",
        "toi": "Ốc luộc gừng sả"
      }
    },
    {
      "day_of_week": 5,
      "day_label": "Thứ 6",
      "meals": {
        "sang": "Bánh mì ốp la (bánh mì đen, trứng, dưa leo)",
        "trua": "Cơm gạo lứt thịt heo luộc, rau muống luộc, canh chua",
        "toi": "Bắp cải cuộn thịt hấp"
      }
    },
    {
      "day_of_week": 6,
      "day_label": "Thứ 7",
      "meals": {
        "sang": "Bánh tráng cuộn tôm thịt",
        "trua": "Cơm cá thu sốt cà chua, rau xào (ít dầu), canh bí đao",
        "toi": "Canh rau củ thịt bằm"
      }
    },
    {
      "day_of_week": 7,
      "day_label": "Chủ nhật",
      "meals": {
        "sang": "Bún riêu cua (ít dầu, nhiều rau)",
        "trua": "Cơm gạo lứt thịt bò xào (ít dầu), rau luộc, canh mướp đắng",
        "toi": "Gỏi cuốn tôm thịt (chấm nước mắm gừng)"
      }
    }
  ]
}', '2026-05-28T19:05:59.552422+00:00');
INSERT INTO ai_prompt_logs (id, user_id, feature, prompt, response, created_at) VALUES ('b311d11c-7edd-4846-b39c-463fe339ac10', '19404fbe-f489-472c-9580-0551431a3372', 'generate_meal_plan', 'Hãy tạo thực đơn 7 ngày (từ Thứ 2 đến Chủ nhật) phục vụ mục tiêu: "giảm cân".
Mỗi ngày bao gồm 3 bữa: sáng (sang), trưa (trua), tối (toi).
Mỗi món là món Việt Nam phổ biến, dễ nấu.

Trả lời CHÍNH XÁC dưới dạng JSON (không có chú thích, không markdown), theo schema:
{
  "plan": [
    { "day_of_week": 1, "day_label": "Thứ 2", "meals": { "sang": "Tên món", "trua": "Tên món", "toi": "Tên món" } },
    ...
  ]
}
day_of_week từ 1 (Thứ 2) đến 7 (Chủ nhật).', '{
  "plan": [
    {
      "day_of_week": 1,
      "day_label": "Thứ 2",
      "meals": {
        "sang": "Phở gà",
        "trua": "Cơm gà luộc",
        "toi": "Canh chua cá lóc"
      }
    },
    {
      "day_of_week": 2,
      "day_label": "Thứ 3",
      "meals": {
        "sang": "Bánh cuốn chả lụa",
        "trua": "Bún thịt nướng",
        "toi": "Đậu phụ sốt cà chua"
      }
    },
    {
      "day_of_week": 3,
      "day_label": "Thứ 4",
      "meals": {
        "sang": "Cháo gà",
        "trua": "Cơm cá hấp",
        "toi": "Gỏi gà bắp cải"
      }
    },
    {
      "day_of_week": 4,
      "day_label": "Thứ 5",
      "meals": {
        "sang": "Hủ tiếu gà",
        "trua": "Cơm ức gà nướng",
        "toi": "Canh rau củ nấm"
      }
    },
    {
      "day_of_week": 5,
      "day_label": "Thứ 6",
      "meals": {
        "sang": "Bún riêu cua",
        "trua": "Bò xào măng",
        "toi": "Canh bí đao tôm"
      }
    },
    {
      "day_of_week": 6,
      "day_label": "Thứ 7",
      "meals": {
        "sang": "Cháo cá",
        "trua": "Cơm gạo lứt tôm",
        "toi": "Rau muống luộc"
      }
    },
    {
      "day_of_week": 7,
      "day_label": "Chủ nhật",
      "meals": {
        "sang": "Phở bò",
        "trua": "Bún chả",
        "toi": "Gỏi cuốn tôm thịt"
      }
    }
  ]
}', '2026-05-28T19:06:55.014107+00:00');
INSERT INTO ai_prompt_logs (id, user_id, feature, prompt, response, created_at) VALUES ('8568d432-3e08-4a6d-8c50-0dd0ef44f115', '19404fbe-f489-472c-9580-0551431a3372', 'generate_meal_plan', 'Hãy tạo thực đơn 7 ngày (từ Thứ 2 đến Chủ nhật) phục vụ mục tiêu: "ăn healthy".
Mỗi ngày bao gồm 3 bữa: sáng (sang), trưa (trua), tối (toi).
Mỗi món là món Việt Nam phổ biến, dễ nấu.

Trả lời CHÍNH XÁC dưới dạng JSON (không có chú thích, không markdown), theo schema:
{
  "plan": [
    { "day_of_week": 1, "day_label": "Thứ 2", "meals": { "sang": "Tên món", "trua": "Tên món", "toi": "Tên món" } },
    ...
  ]
}
day_of_week từ 1 (Thứ 2) đến 7 (Chủ nhật).', '{
  "plan": [
    {
      "day_of_week": 1,
      "day_label": "Thứ 2",
      "meals": {
        "sang": "Cháo thịt bằm",
        "trua": "Cơm gạo lứt cá thu kho",
        "toi": "Canh rau củ tôm"
      }
    },
    {
      "day_of_week": 2,
      "day_label": "Thứ 3",
      "meals": {
        "sang": "Phở gà",
        "trua": "Cơm gà hấp rau luộc",
        "toi": "Canh bí đỏ tôm"
      }
    },
    {
      "day_of_week": 3,
      "day_label": "Thứ 4",
      "meals": {
        "sang": "Bún riêu cua",
        "trua": "Cơm cá hồi áp chảo salad",
        "toi": "Canh chua cá lóc"
      }
    },
    {
      "day_of_week": 4,
      "day_label": "Thứ 5",
      "meals": {
        "sang": "Bánh cuốn nóng",
        "trua": "Cơm gà xé phay",
        "toi": "Lẩu rau củ tôm"
      }
    },
    {
      "day_of_week": 5,
      "day_label": "Thứ 6",
      "meals": {
        "sang": "Phở bò tái",
        "trua": "Cơm tôm hấp rau củ",
        "toi": "Nộm hoa chuối thịt luộc"
      }
    },
    {
      "day_of_week": 6,
      "day_label": "Thứ 7",
      "meals": {
        "sang": "Cháo gà",
        "trua": "Cơm cá bống kho dưa giá",
        "toi": "Canh măng tây tôm"
      }
    },
    {
      "day_of_week": 7,
      "day_label": "Chủ nhật",
      "meals": {
        "sang": "Bún chả",
        "trua": "Cơm gạo lứt thịt bằm đậu que",
        "toi": "Canh cải nấu tôm"
      }
    }
  ]
}', '2026-05-28T19:07:08.723986+00:00');
INSERT INTO ai_prompt_logs (id, user_id, feature, prompt, response, created_at) VALUES ('83fb6b69-2ba3-4acc-80d0-9f80cfe402e4', '19404fbe-f489-472c-9580-0551431a3372', 'generate_meal_plan', 'Hãy tạo thực đơn 7 ngày (từ Thứ 2 đến Chủ nhật) phục vụ mục tiêu: "ăn healthy".
Mỗi ngày bao gồm 3 bữa: sáng (sang), trưa (trua), tối (toi).
Mỗi món là món Việt Nam phổ biến, dễ nấu.

Trả lời CHÍNH XÁC dưới dạng JSON (không có chú thích, không markdown), theo schema:
{
  "plan": [
    { "day_of_week": 1, "day_label": "Thứ 2", "meals": { "sang": "Tên món", "trua": "Tên món", "toi": "Tên món" } },
    ...
  ]
}
day_of_week từ 1 (Thứ 2) đến 7 (Chủ nhật).', '{
  "plan": [
    {
      "day_of_week": 1,
      "day_label": "Thứ 2",
      "meals": {
        "sang": "Cháo gà",
        "trua": "Cơm tấm sườn nướng",
        "toi": "Bún riêu cua"
      }
    },
    {
      "day_of_week": 2,
      "day_label": "Thứ 3",
      "meals": {
        "sang": "Bánh cuốn chay",
        "trua": "Bún thịt bò xào",
        "toi": "Canh chua cá lóc"
      }
    },
    {
      "day_of_week": 3,
      "day_label": "Thứ 4",
      "meals": {
        "sang": "Phở bò tái",
        "trua": "Cơm gà luộc",
        "toi": "Gỏi cuốn tôm thịt"
      }
    },
    {
      "day_of_week": 4,
      "day_label": "Thứ 5",
      "meals": {
        "sang": "Xôi đậu xanh",
        "trua": "Bún bò Nam Bộ",
        "toi": "Bánh đa cua"
      }
    },
    {
      "day_of_week": 5,
      "day_label": "Thứ 6",
      "meals": {
        "sang": "Cháo cá",
        "trua": "Cơm cá hấp",
        "toi": "Bún chả cá"
      }
    },
    {
      "day_of_week": 6,
      "day_label": "Thứ 7",
      "meals": {
        "sang": "Bún thang",
        "trua": "Cơm tấm gà nướng",
        "toi": "Mỳ Quảng tôm thịt"
      }
    },
    {
      "day_of_week": 7,
      "day_label": "Chủ nhật",
      "meals": {
        "sang": "Bánh cuốn thịt heo",
        "trua": "Cơm rang dưa bò",
        "toi": "Lẩu nấm chay"
      }
    }
  ]
}', '2026-05-28T19:09:59.73231+00:00');
INSERT INTO ai_prompt_logs (id, user_id, feature, prompt, response, created_at) VALUES ('4dd3e51b-cd13-4ebe-b75c-7c9853c14b53', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'generate_meal_plan', 'Hãy tạo thực đơn 7 ngày (từ Thứ 2 đến Chủ nhật) phục vụ mục tiêu: "giảm cân".
Mỗi ngày bao gồm 3 bữa: sáng (sang), trưa (trua), tối (toi).
Mỗi món là món Việt Nam phổ biến, dễ nấu.

Trả lời CHÍNH XÁC dưới dạng JSON (không có chú thích, không markdown), theo schema:
{
  "plan": [
    { "day_of_week": 1, "day_label": "Thứ 2", "meals": { "sang": "Tên món", "trua": "Tên món", "toi": "Tên món" } },
    ...
  ]
}
day_of_week từ 1 (Thứ 2) đến 7 (Chủ nhật).', '{
  "plan": [
    {
      "day_of_week": 1,
      "day_label": "Thứ 2",
      "meals": {
        "sang": "Bún riêu cua",
        "trua": "Cơm gạo lứt, ức gà luộc, rau cải luộc, canh bí đỏ",
        "toi": "Salad ức gà"
      }
    },
    {
      "day_of_week": 2,
      "day_label": "Thứ 3",
      "meals": {
        "sang": "Bánh mì nguyên cám, trứng ốp la, xà lách",
        "trua": "Cơm gạo lứt, tôm hấp, bông cải xanh luộc, canh rau ngót",
        "toi": "Cá hấp, canh bí đỏ nấu tôm"
      }
    },
    {
      "day_of_week": 3,
      "day_label": "Thứ 4",
      "meals": {
        "sang": "Yến mạch nấu bí đỏ",
        "trua": "Cơm gạo lứt, thịt bò xào rau cần, canh rau muống luộc",
        "toi": "Nộm ức gà xé phay"
      }
    },
    {
      "day_of_week": 4,
      "day_label": "Thứ 5",
      "meals": {
        "sang": "Phở bò (ít bánh phở, nhiều rau)",
        "trua": "Cơm gạo lứt, cá hấp xì dầu, rau lang luộc, canh cua mồng tơi",
        "toi": "Salad tôm, canh rong biển đậu phụ"
      }
    },
    {
      "day_of_week": 5,
      "day_label": "Thứ 6",
      "meals": {
        "sang": "Bánh cuốn chay (ít mỡ)",
        "trua": "Cơm gạo lứt, gà xào sả ớt, dưa leo, canh chua cá nục",
        "toi": "Bí đỏ hấp, rau muống xào tỏi, đậu phụ sốt cà"
      }
    },
    {
      "day_of_week": 6,
      "day_label": "Thứ 7",
      "meals": {
        "sang": "Cháo yến mạch thịt băm",
        "trua": "Cơm gạo lứt, tôm rim, rau cải thảo luộc, canh nấm đậu phụ",
        "toi": "Bún nạc (bún, thịt heo luộc, rau sống)"
      }
    },
    {
      "day_of_week": 7,
      "day_label": "Chủ nhật",
      "meals": {
        "sang": "Khoai lang luộc, trứng ốp la, cà chua",
        "trua": "Cơm gạo lứt, ba chỉ luộc (bỏ da), trứng luộc, rau sống, canh bầu tôm",
        "toi": "Salad cá ngừ, canh rau củ"
      }
    }
  ]
}', '2026-05-29T06:35:02.743714+00:00');
INSERT INTO ai_prompt_logs (id, user_id, feature, prompt, response, created_at) VALUES ('20baf5e1-70fc-41dc-ae2d-1207de4337ea', '19404fbe-f489-472c-9580-0551431a3372', 'generate_meal_plan', 'Hãy tạo thực đơn 7 ngày (từ Thứ 2 đến Chủ nhật) phục vụ mục tiêu: "ăn healthy".
Mỗi ngày bao gồm 3 bữa: sáng (sang), trưa (trua), tối (toi).
Mỗi món là món Việt Nam phổ biến, dễ nấu.

Trả lời CHÍNH XÁC dưới dạng JSON (không có chú thích, không markdown), theo schema:
{
  "plan": [
    { "day_of_week": 1, "day_label": "Thứ 2", "meals": { "sang": "Tên món", "trua": "Tên món", "toi": "Tên món" } },
    ...
  ]
}
day_of_week từ 1 (Thứ 2) đến 7 (Chủ nhật).', '{
  "plan": [
    { "day_of_week": 1, "day_label": "Thứ 2", "meals": { "sang": "Phở gà", "trua": "Cơm gạo lứt ức gà áp chảo rau luộc", "toi": "Canh chua cá lóc" } },
    { "day_of_week": 2, "day_label": "Thứ 3", "meals": { "sang": "Bún cá", "trua": "Cơm gạo lứt thịt bò xào rau củ", "toi": "Gỏi cuốn tôm thịt" } },
    { "day_of_week": 3, "day_label": "Thứ 4", "meals": { "sang": "Cháo gà", "trua": "Cơm gạo lứt cá hấp xì dầu", "toi": "Nộm hoa chuối" } },
    { "day_of_week": 4, "day_label": "Thứ 5", "meals": { "sang": "Bánh mì ốp la", "trua": "Cơm gạo lứt tôm luộc canh cải xanh", "toi": "Thịt bò lá lốt cuốn" } },
    { "day_of_week": 5, "day_label": "Thứ 6", "meals": { "sang": "Bún chả cá", "trua": "Cơm gạo lứt thịt gà xào nấm", "toi": "Canh bí đao tôm" } },
    { "day_of_week": 6, "day_label": "Thứ 7", "meals": { "sang": "Xôi gà", "trua": "Miến gà", "toi": "Canh khổ qua nhồi thịt" } },
    { "day_of_week": 7, "day_label": "Chủ nhật", "meals": { "sang": "Bún tôm nướng", "trua": "Cơm tấm gạo lứt sườn non hấp", "toi": "Canh rau củ thập cẩm" } }
  ]
}', '2026-05-28T19:19:13.216969+00:00');
INSERT INTO ai_prompt_logs (id, user_id, feature, prompt, response, created_at) VALUES ('62cb21ce-a366-4d20-b14a-f62ad06196ee', '19404fbe-f489-472c-9580-0551431a3372', 'suggest_from_ingredients', 'Tôi đang có những nguyên liệu sau: thịt heo.
Hãy gợi ý 3-5 món ăn Việt Nam có thể nấu được với các nguyên liệu trên.
Với mỗi món, ghi:
- Tên món
- Mô tả ngắn 1 câu
- Thời gian nấu ước lượng
- Mức độ khó (dễ / trung bình / khó)
Trả lời bằng tiếng Việt, dùng định dạng markdown rõ ràng có tiêu đề và gạch đầu dòng.', 'Dưới đây là 4 món ăn Việt Nam bạn có thể nấu với nguyên liệu chính là thịt heo (cần thêm vài gia vị cơ bản như hành, tỏi, nước mắm,...). Mỗi món đều có mô tả ngắn, thời gian nấu ước lượng và mức độ khó.

### 1. Thịt heo luộc  
- **Mô tả:** Thịt heo (thường là ba chỉ hoặc thăn) luộc chín tới, thái lát mỏng, ăn kèm rau sống và nước mắm chua ngọt.  
- **Thời gian nấu:** 30 phút  
- **Mức độ khó:** Dễ  

### 2. Thịt heo kho tàu (thịt kho trứng)  
- **Mô tả:** Thịt heo (ba chỉ hoặc chân giò) kho mềm cùng trứng vịt/luộc trong nước dừa hoặc nước hàng, đậm đà, ăn với cơm nóng.  
- **Thời gian nấu:** 1,5 giờ  
- **Mức độ khó:** Trung bình  

### 3. Thịt heo xào sả ớt  
- **Mô tả:** Thịt heo thái mỏng xào nhanh với sả băm, ớt và hành tỏi, thơm cay, hấp dẫn.  
- **Thời gian nấu:** 20 phút  
- **Mức độ khó:** Dễ  

### 4. Thịt heo rang cháy cạnh  
- **Mô tả:** Thịt ba chỉ thái miếng vuông, rang vàng giòn các mặt, nêm nước mắm, đường, hành tỏi, tạo lớp cạnh giòn rụm, mặn ngọt.  
- **Thời gian nấu:** 25 phút  
- **Mức độ khó:** Dễ', '2026-05-28T19:20:21.090758+00:00');
INSERT INTO ai_prompt_logs (id, user_id, feature, prompt, response, created_at) VALUES ('0e49adae-9e1e-4b1d-8e9b-890e7fb4c106', '19404fbe-f489-472c-9580-0551431a3372', 'generate_meal_plan', 'Hãy tạo thực đơn 7 ngày (từ Thứ 2 đến Chủ nhật) phục vụ mục tiêu: "giảm cân".
Mỗi ngày bao gồm 3 bữa: sáng (sang), trưa (trua), tối (toi).
Mỗi món là món Việt Nam phổ biến, dễ nấu.

Trả lời CHÍNH XÁC dưới dạng JSON (không có chú thích, không markdown), theo schema:
{
  "plan": [
    { "day_of_week": 1, "day_label": "Thứ 2", "meals": { "sang": "Tên món", "trua": "Tên món", "toi": "Tên món" } },
    ...
  ]
}
day_of_week từ 1 (Thứ 2) đến 7 (Chủ nhật).', '{
  "plan": [
    {
      "day_of_week": 1,
      "day_label": "Thứ 2",
      "meals": {
        "sang": "Phở bò tái",
        "trua": "Cơm gạo lứt ức gà luộc rau củ",
        "toi": "Canh bí đao thịt bằm"
      }
    },
    {
      "day_of_week": 2,
      "day_label": "Thứ 3",
      "meals": {
        "sang": "Bánh mì ốp la",
        "trua": "Cơm gạo lứt cá hồi áp chảo",
        "toi": "Rau muống luộc đậu phụ"
      }
    },
    {
      "day_of_week": 3,
      "day_label": "Thứ 4",
      "meals": {
        "sang": "Bún riêu cua",
        "trua": "Cơm gạo lứt thịt bò xào rau cải",
        "toi": "Canh chua cá lóc"
      }
    },
    {
      "day_of_week": 4,
      "day_label": "Thứ 5",
      "meals": {
        "sang": "Cháo gạo lứt thịt bằm",
        "trua": "Cơm gạo lứt tôm xào bông cải",
        "toi": "Bí đỏ luộc đậu hũ sốt cà"
      }
    },
    {
      "day_of_week": 5,
      "day_label": "Thứ 6",
      "meals": {
        "sang": "Bánh cuốn thịt bằm",
        "trua": "Cơm gạo lứt sườn nướng rau sống",
        "toi": "Canh rau ngót thịt bằm"
      }
    },
    {
      "day_of_week": 6,
      "day_label": "Thứ 7",
      "meals": {
        "sang": "Phở gà",
        "trua": "Cơm gạo lứt cá thu sốt cà chua",
        "toi": "Gỏi đu đủ tôm thịt"
      }
    },
    {
      "day_of_week": 7,
      "day_label": "Chủ nhật",
      "meals": {
        "sang": "Bún thịt nướng",
        "trua": "Cơm gạo lứt ức gà xé trộn rau cải",
        "toi": "Canh mồng tơi cua"
      }
    }
  ]
}', '2026-05-28T19:52:26.682011+00:00');
INSERT INTO ai_prompt_logs (id, user_id, feature, prompt, response, created_at) VALUES ('07fd77a4-1780-4523-8c32-728297e1689a', '19404fbe-f489-472c-9580-0551431a3372', 'suggest_from_ingredients', 'Tôi đang có những nguyên liệu sau: cà chua, trứng, tỏi.
Hãy gợi ý 3-5 món ăn Việt Nam có thể nấu được với các nguyên liệu trên.
Với mỗi món, ghi:
- Tên món
- Mô tả ngắn 1 câu
- Thời gian nấu ước lượng
- Mức độ khó (dễ / trung bình / khó)
Trả lời bằng tiếng Việt, dùng định dạng markdown rõ ràng có tiêu đề và gạch đầu dòng.', '# Gợi ý món ăn từ cà chua, trứng và tỏi

## 1. Trứng chiên cà chua (trứng tráng cà chua tỏi)
- **Mô tả:** Trứng quyện cùng cà chua chua ngọt, thêm tỏi phi thơm, tạo nên món ăn nhanh gọn, hao cơm.  
- **Thời gian nấu:** 10 phút  
- **Mức độ khó:** Dễ  

## 2. Canh cà chua trứng
- **Mô tả:** Nước canh chua nhẹ từ cà chua, trứng đánh vào tạo vân mềm, điểm thêm tỏi phi vàng thơm.  
- **Thời gian nấu:** 15 phút  
- **Mức độ khó:** Dễ  

## 3. Cà chua nhồi trứng chiên
- **Mô tả:** Cà chua cắt nắp, lấy ruột, nhồi trứng gia vị rồi chiên vàng, dùng ruột cà chua và tỏi làm sốt rưới lên.  
- **Thời gian nấu:** 25 phút  
- **Mức độ khó:** Trung bình  

## 4. Trứng luộc sốt cà chua tỏi
- **Mô tả:** Trứng luộc bổ miếng, sốt cùng cà chua và tỏi băm đến khi sánh, đậm đà hương vị.  
- **Thời gian nấu:** 20 phút  
- **Mức độ khó:** Dễ  

## 5. Mì xào cà chua trứng tỏi
- **Mô tả:** Sợi mì mềm kết hợp cà chua chua và trứng, tỏi phi thơm cho bữa ăn nhanh đơn giản.  
- **Thời gian nấu:** 15 phút  
- **Mức độ khó:** Dễ', '2026-05-28T20:01:08.788314+00:00');
INSERT INTO ai_prompt_logs (id, user_id, feature, prompt, response, created_at) VALUES ('6ec71efc-ced9-4b52-a7e1-35191f6c0794', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'summarize_recipe', 'Hãy tóm tắt công thức nấu ăn sau thành 5-7 bước ngắn gọn, dễ nhớ.
Mỗi bước chỉ 1-2 câu, dùng động từ rõ ràng ở đầu câu.
Trả lời bằng tiếng Việt, dạng danh sách đánh số.

Công thức:
Tên món: Trứng chiên
Mô tả: Trứng chiên lòng đào chấm kèm với bánh mỳ
Khẩu phần: 1
Thời gian: 30 phút
Nguyên liệu:
- Trứng (2 quả)
- Bánh mỳ (2 bánh)
Các bước:
1. Bắt chảo lên bếp cho nóng
2. Khi chảo đã nóng thì đập trứng vào
3. Trứng chín thì không lật lại, chỉ đậy nắp lại trong 30 giây', '1. Chuẩn bị 2 quả trứng và 2 bánh mỳ.
2. Bắc chảo lên bếp, làm nóng ở lửa vừa.
3. Đập trứng vào chảo khi chảo đã nóng.
4. Chiên trứng không lật, đậy nắp chảo 30 giây.
5. Tắt bếp, bày trứng ra đĩa và ăn kèm bánh mỳ.', '2026-05-29T06:33:35.992691+00:00');
INSERT INTO ai_prompt_logs (id, user_id, feature, prompt, response, created_at) VALUES ('7f53f208-1b87-43a1-8954-317d6bbe025f', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'suggest_from_ingredients', 'Tôi đang có những nguyên liệu sau: trứng , bánh mỳ.
Hãy gợi ý 3-5 món ăn Việt Nam có thể nấu được với các nguyên liệu trên.
Với mỗi món, ghi:
- Tên món
- Mô tả ngắn 1 câu
- Thời gian nấu ước lượng
- Mức độ khó (dễ / trung bình / khó)
Trả lời bằng tiếng Việt, dùng định dạng markdown rõ ràng có tiêu đề và gạch đầu dòng.', 'Dưới đây là 4 món ăn Việt Nam đơn giản và thực tế bạn có thể thực hiện ngay với hai nguyên liệu chính là trứng và bánh mỳ. Các món đều dễ làm, phù hợp cho bữa sáng hoặc bữa ăn nhanh.

## 1. Bánh mì ốp la
- **Mô tả ngắn:** Bánh mì nướng giòn kẹp trứng ốp la lòng đào, béo ngậy và thơm ngon.
- **Thời gian nấu:** 10 phút
- **Mức độ khó:** Dễ

## 2. Bánh mì trứng chiên
- **Mô tả ngắn:** Bánh mì tẩm trứng và chiên vàng giòn, ăn kèm tương ớt hoặc sốt cà chua.
- **Thời gian nấu:** 15 phút
- **Mức độ khó:** Dễ

## 3. Cháo trứng bánh mì
- **Mô tả ngắn:** Bánh mì cắt nhỏ nấu cùng trứng tạo thành món cháo ấm bụng, sánh mịn.
- **Thời gian nấu:** 20 phút
- **Mức độ khó:** Dễ

## 4. Bánh mì kẹp trứng tráng
- **Mô tả ngắn:** Bánh mì tươi kẹp trứng tráng mỏng, có thể thêm hành lá hoặc gia vị tùy thích.
- **Thời gian nấu:** 10 phút
- **Mức độ khó:** Dễ', '2026-05-29T06:36:48.468961+00:00');
INSERT INTO ai_prompt_logs (id, user_id, feature, prompt, response, created_at) VALUES ('615bc0a9-d10c-4e49-9fe7-40922926de7b', 'e80553f1-727c-422d-b5b5-b5a61819c5ba', 'simplify_recipe', 'Hãy viết lại công thức sau thành "phiên bản dễ nấu hơn":
- Giảm số lượng nguyên liệu khó tìm.
- Đơn giản hóa các bước.
- Ưu tiên dụng cụ phổ thông trong bếp Việt.
- Giữ nguyên hương vị chính.

Trả lời bằng tiếng Việt, có hai phần: "Nguyên liệu rút gọn" và "Cách làm đơn giản" (mỗi bước 1-2 câu).

Công thức gốc:
Tên món: Cá Lóc Kho Tộ Ba Gian
Mô tả: Món ăn đưa cơm số 1 ngày đông. Những lát cá lóc tươi rói kho liu riu trong tộ đất sánh đặc kẹo sốt mặn ngọt cay nồng, rải đầy hành hoa và tóp mỡ giòn tan.
Khẩu phần: 3
Thời gian: 45 phút
Nguyên liệu:
- Cá lóc đồng thái lát dày (500g)
- Tóp mỡ heo giòn ráo dầu (50g)
- Nước mắm cốt nhĩ (4 thìa)
- Đường phèn cát nhỏ, tiêu hạt đập dập (2 thìa)
- Ớt hiểm nguyên quả, hành tỏi băm (1 ít)
Các bước:
1. Cá lóc ướp cùng hành tỏi băm, nước mắm, đường phèn, dầu màu dừa và hạt tiêu đập dập trong 30 phút.
2. Lót vài nhánh sả và gừng thái lát dưới đáy tộ đất để chống cháy.
3. Xếp từng lát cá vào tộ đất, rưới đều phần nước ướp cá lên.
4. Đun tộ đất nhỏ lửa liu riu đến khi thịt cá săn lại thì lật mặt cá, thêm ớt hiểm đun tiếp.
5. Khi nước kho sệt quánh kẹo lại bám đều quanh lát cá, rắc tóp mỡ hành hoa và tiêu lên là hoàn tất.
Ghi chú: Kho bằng tộ đất (nồi đất) giữ nhiệt tốt giúp cá ngấm gia vị sâu vào tận bên trong xương và thịt săn chắc cực kỳ ngon.', '**Nguyên liệu rút gọn:**
- 500g cá lóc tươi (thái lát dày), có thể thay bằng cá rô đồng.
- 50g mỡ thái hạt lựu (hoặc tóp mỡ mua sẵn, sau đó chiên giòn).
- 4 muỗng canh nước mắm ngon (dùng mắm thường, không cần loại cốt đặc biệt).
- 2 muỗng canh đường vàng (hoặc đường cát, nếu không có đường phèn).
- 1 muỗng cà phê tiêu xay (hoặc hạt tiêu đập nhỏ).
- 2–3 trái ớt hiểm.
- Hành tím, tỏi (băm nhỏ mỗi thứ 1 muỗng).
- (Tùy chọn: vài lát gừng, sả nếu thích, nhưng không bắt buộc).

**Cách làm đơn giản:**
1. **Ướp cá:** Trộn cá lát với hành tím, tỏi băm, nước mắm, đường, tiêu. Để thấm 15 phút.
2. **Kho cá:** Xếp cá vào nồi (nồi thường hay nồi đất). Rưới phần nước ướp lên trên, thêm ớt hiểm và chút nước nóng (chỉ đủ xâm xấp). Đậy nắp, đun lửa nhỏ liu riu 20 phút.
3. **Hoàn tất:** Khi nước trong nồi keo sánh lại (sền sệt), rắc tóp mỡ đã chiên giòn lên mặt cá. Tắt bếp, thêm chút tiêu xay. Ăn nóng với cơm trắng.', '2026-05-29T08:45:41.663267+00:00');
INSERT INTO ai_prompt_logs (id, user_id, feature, prompt, response, created_at) VALUES ('c2da8e53-66b6-4b4d-b4bd-e59d3f7ce2b1', '4ef5e41a-595e-4c73-bfe0-00147518b08a', 'suggest_from_ingredients', 'Tôi đang có những nguyên liệu sau: thịt , trứng cút.
Hãy gợi ý 3-5 món ăn Việt Nam có thể nấu được với các nguyên liệu trên.
Với mỗi món, ghi:
- Tên món
- Mô tả ngắn 1 câu
- Thời gian nấu ước lượng
- Mức độ khó (dễ / trung bình / khó)
Trả lời bằng tiếng Việt, dùng định dạng markdown rõ ràng có tiêu đề và gạch đầu dòng.', '# Gợi ý các món ăn từ thịt và trứng cút

Dưới đây là những món Việt Nam thiết thực, dễ làm với hai nguyên liệu chính là thịt và trứng cút:

- **Thịt kho trứng cút**
  - Thịt ba chỉ kho mềm thơm cùng trứng cút bùi béo, đậm đà nước kho, ăn với cơm nóng rất hao cơm.
  - Thời gian nấu: 45–55 phút
  - Mức độ khó: Dễ

- **Chả trứng cút hấp thịt**
  - Trứng cút và thịt xay trộn đều với mộc nhĩ, hấp chín tạo thành món chả mềm, thơm ngon cho bữa cơm gia đình.
  - Thời gian nấu: 25–35 phút
  - Mức độ khó: Dễ

- **Trứng cút xào thịt**
  - Thịt thái mỏng xào chín, cho trứng cút vào đảo nhẹ cùng hành lá, vừa nhanh vừa đưa cơm.
  - Thời gian nấu: 15–20 phút
  - Mức độ khó: Dễ

- **Mì Quảng thịt trứng cút**
  - Mì gói hoặc mì tươi kết hợp với thịt nạc thái lát, trứng cút luộc và ít rau sống, chan nước dùng đậm đà mang phong cách Quảng Nam.
  - Thời gian nấu: 30–40 phút
  - Mức độ khó: Trung bình', '2026-05-29T08:54:03.818155+00:00');

