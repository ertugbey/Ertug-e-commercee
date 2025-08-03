import { Typography, Box, Container, Paper } from "@mui/material";
import Counter from "./counter/Counter";

export default function AboutPage() {
    return (
        <>
        <Counter /> 
        <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
            <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', color: 'primary.main' }}>
                Hakkımızda
            </Typography>
            
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
                    Ertug Store'a Hoş Geldiniz
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.1rem' }}>
                    2025 yılında kurulan Ertug Store, e-ticaret dünyasında güvenilir ve kaliteli hizmet anlayışıyla 
                    müşterilerimize en iyi deneyimi sunmaya odaklanmıştır. Kısa sürede sektörde önemli başarılar elde 
                    ederek, müşteri memnuniyetini her zaman ön planda tutan bir yaklaşım benimsemiştir.
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.1rem' }}>
                    Geniş ürün yelpazemiz, rekabetçi fiyatlarımız ve müşteri odaklı hizmet anlayışımızla, 
                    Türkiye'nin önde gelen e-ticaret platformlarından biri haline gelmeyi başardık. 
                    Teknoloji, moda, ev dekorasyonu, spor ve daha birçok alanda sunduğumuz ürünlerle 
                    müşterilerimizin ihtiyaçlarını karşılamaya devam ediyoruz.
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.1rem' }}>
                    Güvenilirliğimizin temelinde şeffaflık, dürüstlük ve kalite anlayışımız yatmaktadır. 
                    Her ürünümüz titizlikle seçilmekte ve müşterilerimize en yüksek kalite standartlarında 
                    sunulmaktadır. Hızlı teslimat, güvenli ödeme sistemleri ve 7/24 müşteri desteği ile 
                    alışveriş deneyiminizi en üst seviyeye çıkarmayı hedefliyoruz.
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.1rem' }}>
                    Gelecekte de inovasyon ve müşteri memnuniyetini ön planda tutarak, e-ticaret sektöründe 
                    öncü rolümüzü sürdürmeye kararlıyız. Ertug Store olarak, müşterilerimizin güvenini 
                    kazanmaya devam edecek ve her zaman en iyi hizmeti sunmaya odaklanacağız.
                </Typography>
                
                <Box sx={{ mt: 4, p: 3, backgroundColor: 'primary.light', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 'bold' }}>
                        Neden Ertug Store?
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'white', lineHeight: 1.6 }}>
                        ✓ 2025'ten beri güvenilir hizmet<br/>
                        ✓ Geniş ürün yelpazesi<br/>
                        ✓ Hızlı ve güvenli teslimat<br/>
                        ✓ 7/24 müşteri desteği<br/>
                        ✓ Rekabetçi fiyatlar<br/>
                        ✓ Kaliteli ürün garantisi
                    </Typography>
                </Box>
            </Paper>
        </Container>
        </>
    );
} 