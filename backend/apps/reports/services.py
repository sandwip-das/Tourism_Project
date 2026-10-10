import io
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from apps.bookings.models import Booking
from apps.tours.models import TourPackage
from apps.destinations.models import Destination


def create_header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('Helvetica-Bold', 14)
    canvas.setFillColor(colors.HexColor('#0F172A'))
    canvas.drawString(40, letter[1] - 40, "SANDVIORA TOURISM LTD.")
    
    canvas.setFont('Helvetica', 9)
    canvas.setFillColor(colors.HexColor('#64748B'))
    canvas.drawString(40, letter[1] - 54, "Central Operations & Governance Platform | Dhaka, Bangladesh")
    
    # Header divider line
    canvas.setStrokeColor(colors.HexColor('#0284C7'))
    canvas.setLineWidth(2)
    canvas.line(40, letter[1] - 62, letter[0] - 40, letter[1] - 62)
    
    # Footer
    page_num = canvas.getPageNumber()
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(colors.HexColor('#94A3B8'))
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    canvas.drawString(40, 30, f"Generated on {now_str} (Asia/Dhaka) | Confidential Corporate Document")
    canvas.drawRightString(letter[0] - 40, 30, f"Page {page_num}")
    canvas.setStrokeColor(colors.HexColor('#E2E8F0'))
    canvas.setLineWidth(1)
    canvas.line(40, 42, letter[0] - 40, 42)
    canvas.restoreState()


def generate_bookings_report_pdf():
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=80,
        bottomMargin=60
    )
    
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=6
    )
    subtitle_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#475569'),
        spaceAfter=15
    )
    cell_style = ParagraphStyle(
        'Cell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor('#1E293B')
    )
    cell_bold = ParagraphStyle(
        'CellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor('#0F172A')
    )

    elements = []
    elements.append(Paragraph("BOOKINGS & RESERVATIONS AUDIT REPORT", title_style))
    elements.append(Paragraph(f"Comprehensive transaction logs, confirmation statuses, and guest count tracking. Extracted at: {datetime.now().strftime('%B %d, %Y')}", subtitle_style))
    
    bookings = Booking.objects.select_related('tour').all()
    
    # Table data
    data = [
        [
            Paragraph("Ref #", cell_bold),
            Paragraph("Customer", cell_bold),
            Paragraph("Tour Package", cell_bold),
            Paragraph("Date", cell_bold),
            Paragraph("Travelers", cell_bold),
            Paragraph("Total (BDT)", cell_bold),
            Paragraph("Payment", cell_bold),
            Paragraph("Status", cell_bold),
        ]
    ]
    
    total_revenue = 0
    total_travelers = 0
    for b in bookings:
        total_revenue += float(b.total_price)
        total_travelers += b.number_of_travelers
        data.append([
            Paragraph(b.booking_reference, cell_bold),
            Paragraph(f"{b.customer_name}<br/>{b.customer_phone}", cell_style),
            Paragraph(b.tour.title_en[:26], cell_style),
            Paragraph(str(b.travel_date), cell_style),
            Paragraph(str(b.number_of_travelers), cell_style),
            Paragraph(f"৳{b.total_price:,.0f}", cell_bold),
            Paragraph(b.payment_status.upper(), cell_style),
            Paragraph(b.booking_status.upper(), cell_style),
        ])
    
    col_widths = [75, 95, 120, 60, 45, 60, 50, 45]
    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#F1F5F9')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#0F172A')),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#E2E8F0')),
    ]))
    elements.append(t)
    elements.append(Spacer(1, 15))
    
    # Summary Box
    summary_data = [
        [
            Paragraph("<b>Total Bookings:</b>", cell_style),
            Paragraph(str(len(bookings)), cell_bold),
            Paragraph("<b>Total Travelers:</b>", cell_style),
            Paragraph(str(total_travelers), cell_bold),
            Paragraph("<b>Gross Booking Volume:</b>", cell_style),
            Paragraph(f"৳{total_revenue:,.2f}", cell_bold),
        ]
    ]
    summary_table = Table(summary_data, colWidths=[90, 60, 90, 60, 130, 90])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#E0F2FE')),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor('#0284C7')),
        ('PADDING', (0, 0), (-1, -1), 8),
    ]))
    elements.append(summary_table)

    doc.build(elements, onFirstPage=create_header_footer, onLaterPages=create_header_footer)
    buffer.seek(0)
    return buffer.getvalue()


def generate_revenue_report_pdf():
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=80,
        bottomMargin=60
    )
    
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=6
    )
    subtitle_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#475569'),
        spaceAfter=15
    )
    cell_style = ParagraphStyle('Cell', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=10)
    cell_bold = ParagraphStyle('CellBold', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8, leading=10)

    elements = []
    elements.append(Paragraph("FINANCIAL PERFORMANCE & REVENUE STATEMENT", title_style))
    elements.append(Paragraph(f"Consolidated performance breakdown across tour packages, commission, and payment streams. {datetime.now().strftime('%B %Y')}", subtitle_style))

    tours = TourPackage.objects.all()
    data = [
        [
            Paragraph("Tour Package", cell_bold),
            Paragraph("Base Price", cell_bold),
            Paragraph("Active Bookings", cell_bold),
            Paragraph("Guests Served", cell_bold),
            Paragraph("Revenue Accrued (BDT)", cell_bold),
        ]
    ]

    grand_total = 0
    total_pax = 0
    for tour in tours:
        tour_bookings = Booking.objects.filter(tour=tour)
        b_count = tour_bookings.count()
        pax = sum(b.number_of_travelers for b in tour_bookings)
        rev = sum(float(b.total_price) for b in tour_bookings)
        grand_total += rev
        total_pax += pax
        data.append([
            Paragraph(f"<b>{tour.title_en}</b><br/>{tour.duration_days}D/{tour.duration_nights}N - {tour.start_location}", cell_style),
            Paragraph(f"৳{tour.price_bdt:,.0f}", cell_style),
            Paragraph(str(b_count), cell_style),
            Paragraph(str(pax), cell_style),
            Paragraph(f"৳{rev:,.2f}", cell_bold),
        ])

    t = Table(data, colWidths=[200, 75, 75, 75, 120], repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0F172A')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
        ('PADDING', (0, 0), (-1, -1), 6),
    ]))
    elements.append(t)
    elements.append(Spacer(1, 15))

    elements.append(Paragraph(f"<b>Total Gross Platform Volume:</b> ৳{grand_total:,.2f} | <b>Total Travelers:</b> {total_pax}", title_style))
    doc.build(elements, onFirstPage=create_header_footer, onLaterPages=create_header_footer)
    buffer.seek(0)
    return buffer.getvalue()


def generate_inventory_report_pdf():
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=80,
        bottomMargin=60
    )
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle('DocTitle', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=18, leading=22, textColor=colors.HexColor('#0F172A'), spaceAfter=6)
    subtitle_style = ParagraphStyle('DocSub', parent=styles['Normal'], fontName='Helvetica', fontSize=10, leading=14, textColor=colors.HexColor('#475569'), spaceAfter=15)
    cell_style = ParagraphStyle('Cell', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=10)
    cell_bold = ParagraphStyle('CellBold', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8, leading=10)

    elements = []
    elements.append(Paragraph("TOUR INVENTORY & CAPACITY REPORT", title_style))
    elements.append(Paragraph(f"Current catalogue of active packages, group size limits, and difficulty profiles as of {datetime.now().strftime('%Y-%m-%d')}", subtitle_style))

    tours = TourPackage.objects.select_related('category', 'destination').all()
    data = [
        [
            Paragraph("Tour Title", cell_bold),
            Paragraph("Category", cell_bold),
            Paragraph("Destination", cell_bold),
            Paragraph("Duration", cell_bold),
            Paragraph("Max Group", cell_bold),
            Paragraph("Price", cell_bold),
            Paragraph("Rating", cell_bold),
        ]
    ]

    for t_obj in tours:
        cat_name = t_obj.category.name_en if t_obj.category else 'N/A'
        dest_name = t_obj.destination.name_en if t_obj.destination else 'General'
        data.append([
            Paragraph(t_obj.title_en, cell_bold),
            Paragraph(cat_name, cell_style),
            Paragraph(dest_name, cell_style),
            Paragraph(f"{t_obj.duration_days}D/{t_obj.duration_nights}N", cell_style),
            Paragraph(f"{t_obj.max_group_size} pax", cell_style),
            Paragraph(f"৳{t_obj.price_bdt:,.0f}", cell_style),
            Paragraph(f"★ {t_obj.rating}", cell_style),
        ])

    table = Table(data, colWidths=[140, 80, 80, 60, 60, 65, 55], repeatRows=1)
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#F8FAFC')),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#E2E8F0')),
        ('PADDING', (0, 0), (-1, -1), 6),
    ]))
    elements.append(table)
    doc.build(elements, onFirstPage=create_header_footer, onLaterPages=create_header_footer)
    buffer.seek(0)
    return buffer.getvalue()


def generate_single_booking_voucher_pdf(booking):
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=80,
        bottomMargin=60
    )
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle('DocTitle', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=20, leading=24, textColor=colors.HexColor('#0F172A'), spaceAfter=4)
    subtitle_style = ParagraphStyle('DocSub', parent=styles['Normal'], fontName='Helvetica', fontSize=10, leading=14, textColor=colors.HexColor('#0284C7'), spaceAfter=15)
    cell_style = ParagraphStyle('Cell', parent=styles['Normal'], fontName='Helvetica', fontSize=9, leading=12)
    cell_bold = ParagraphStyle('CellBold', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9, leading=12)

    elements = []
    elements.append(Paragraph("OFFICIAL TOUR CONFIRMATION VOUCHER", title_style))
    elements.append(Paragraph(f"Booking Reference: <b>{booking.booking_reference}</b> | Issued by Sandviora Tourism Ltd.", subtitle_style))

    voucher_data = [
        [Paragraph("Lead Guest Name:", cell_bold), Paragraph(booking.customer_name, cell_style)],
        [Paragraph("Customer Contact:", cell_bold), Paragraph(f"{booking.customer_phone} | {booking.customer_email}", cell_style)],
        [Paragraph("Tour Package:", cell_bold), Paragraph(booking.tour.title_en, cell_bold)],
        [Paragraph("Travel Date:", cell_bold), Paragraph(str(booking.travel_date), cell_style)],
        [Paragraph("Number of Travelers:", cell_bold), Paragraph(f"{booking.number_of_travelers} Person(s)", cell_style)],
        [Paragraph("Total Amount Paid/Due:", cell_bold), Paragraph(f"৳{booking.total_price:,.2f} BDT", cell_bold)],
        [Paragraph("Payment Status:", cell_bold), Paragraph(booking.payment_status.upper(), cell_bold)],
        [Paragraph("Booking Status:", cell_bold), Paragraph(booking.booking_status.upper(), cell_bold)],
        [Paragraph("Pickup / Starting Point:", cell_bold), Paragraph(booking.tour.start_location, cell_style)],
        [Paragraph("Special Instructions:", cell_bold), Paragraph(booking.special_requests or "Standard arrangements", cell_style)],
    ]

    vt = Table(voucher_data, colWidths=[150, 390])
    vt.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#F8FAFC')),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
        ('PADDING', (0, 0), (-1, -1), 7),
    ]))
    elements.append(vt)
    elements.append(Spacer(1, 15))

    terms = """
    <b>Important Traveler Guidelines & Terms:</b><br/>
    1. Please present this voucher along with a valid National ID or Passport at the meeting location.<br/>
    2. Arrive at least 30 minutes before the scheduled departure time.<br/>
    3. Emergency Helpline: +880 1700-000000 | 24/7 Operations Room.<br/>
    4. Sandviora Tourism guarantees eco-conscious travel standards and certified local guidance.
    """
    elements.append(Paragraph(terms, cell_style))

    doc.build(elements, onFirstPage=create_header_footer, onLaterPages=create_header_footer)
    buffer.seek(0)
    return buffer.getvalue()
